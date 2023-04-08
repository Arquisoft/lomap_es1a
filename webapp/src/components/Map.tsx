import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState } from "react";
import mapboxgl, { Marker } from "mapbox-gl";
import axios from "axios";

mapboxgl.accessToken =
  "pk.eyJ1IjoidW8yNjQ1NzgiLCJhIjoiY2xldzVmcnBhMTYxMDNzczBwczRvMm5ueSJ9.t5bV5V6yx7ES0VZKIEqDsw";

interface Props {
  lng: number;
  lat: number;
  zoom: number;
  mapWidth: string;
  mapHeight: string;
  onFormSelect?: (state: boolean, lat: number, lon: number) => void;
  onIconSelect?: (state: boolean, lat: number, lon: number) => void;
}

export default class Map extends React.Component<Props> {
  mapContainer: any;
  map: any;
  mapMarkers: Array<any> = [];
  
  async componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/light-v11",
      center: [this.props.lng, this.props.lat],
      zoom: this.props.zoom,
      attributionControl: false,
    });

    const response = await axios.get("http://localhost:5000/locations");
      console.log(response.data);

    this.map.doubleClickZoom.disable();

    this.map.on("dblclick", (e: any) => {
      this.mapMarkers.forEach((marker: any) => {
        marker.remove();
      });

      if (this.props.onFormSelect != undefined)
        this.props.onFormSelect(true, e.lngLat.lat, e.lngLat.lng);

      if (this.props.onIconSelect != undefined)
        this.props.onIconSelect(false, e.lngLat.lat, e.lngLat.lng);

      this.map.flyTo({
        center: e.lngLat,
        zoom: 17,
      });

      const popup = new mapboxgl.Popup().setLngLat(e.lngLat);

      const marker = new Marker({ color: "#FF0000", draggable: false })
        .setLngLat(e.lngLat)
        .addTo(this.map);

      this.mapMarkers.push(marker);
      marker.setPopup(popup);
    });

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "bottom-right"
    );

    // Example locations for testing purposes

    this.map.on("load", () => {
      this.map.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                description:
                  '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
                icon: "theatre",
              },
              geometry: {
                type: "Point",
                coordinates: [4.3075247, 50.85753],
              },
            },
            {
              type: "Feature",
              properties: {
                description:
                  '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
                icon: "theatre",
              },
              geometry: {
                type: "Point",
                coordinates: [4.3187, 50.862966],
              },
            },
            {
              type: "Feature",
              properties: {
                description:
                  '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
                icon: "bar",
              },
              geometry: {
                type: "Point",
                coordinates: [4.334786, 50.851208],
              },
            },
            {
              type: "Feature",
              properties: {
                description:
                  '<strong>Parlamento Europeo</strong><p>Me encanta la política!</p>',
                icon: "art-gallery",
              },
              geometry: {
                type: "Point",
                coordinates: [4.37433, 50.83881],
              },
            },
          ],
        },
      });

      // Add a layer showing the places.
      this.map.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": ["get", "icon"],
          "icon-allow-overlap": true,
          "icon-size": 2,
        }
      });

      this.map.on("click", "places", (e: any) => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        this.map.flyTo({
          center: e.lngLat,
          zoom: 17,
        });

        this.mapMarkers.forEach((marker: any) => {
          marker.remove();
        });

        if (this.props.onFormSelect != undefined)
          this.props.onFormSelect(false, e.lngLat.lat, e.lngLat.lng);

        if (this.props.onIconSelect != undefined)
          this.props.onIconSelect(true, e.lngLat.lat, e.lngLat.lng);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      this.map.on("mouseenter", "places", () => {
        this.map.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      this.map.on("mouseleave", "places", () => {
        this.map.getCanvas().style.cursor = "";
      });
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div
        ref={(el) => (this.mapContainer = el)}
        style={{
          width: this.props.mapWidth,
          height: this.props.mapHeight,
          overflow: "hidden",
        }}
      />
    );
  }
}
