
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState } from "react";
import axios from "axios";
import { requestToList } from '../util/LocationParser';
import mapboxgl, { Marker } from "mapbox-gl";

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass =  require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

mapboxgl.accessToken =
  "pk.eyJ1IjoidW8yNjQ1NzgiLCJhIjoiY2xldzVmcnBhMTYxMDNzczBwczRvMm5ueSJ9.t5bV5V6yx7ES0VZKIEqDsw";
 
interface Props {
  lng: number;
  lat: number;
  zoom: number;
  mapWidth: string;
  mapHeight: string;
  mapTheme: string;
  finishedMounting?: () => void;
  onFormSelect?: (state: boolean, lat: number, lon: number) => void;
  onIconSelect?: (state: boolean, lat: number, lon: number, id:string) => void;
  onMapSubmit?: (map: any, markers: any[]) => void;
}

export default class Map extends React.Component<Props> {
  mapContainer: any;
  map: any;
  mapMarkers: Array<any> = [];
  
  async componentDidMount() {

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: this.props.mapTheme === 'light' ? "mapbox://styles/alvesit0/clg86aosh005p01o5khz3eqcw" : "mapbox://styles/alvesit0/clgtrmdnh004001qy4ngrcyb5",
      center: [this.props.lng, this.props.lat],
      zoom: this.props.zoom,
      attributionControl: false,
    });

    if (this.props.onMapSubmit !== undefined) 
      this.props.onMapSubmit(this.map, this.mapMarkers);

    this.map.doubleClickZoom.disable();

    this.map.on("dblclick", (e: any) => {
      this.mapMarkers.forEach((marker: any) => {
        marker.remove();
      });

      if (this.props.onFormSelect !== undefined)
        this.props.onFormSelect(true, e.lngLat.lat, e.lngLat.lng);
        
      if (this.props.onIconSelect !== undefined)
        this.props.onIconSelect(false, e.lngLat.lat, e.lngLat.lng, "noid");

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

    if (this.props.onMapSubmit !== undefined) 
      this.props.onMapSubmit(this.map, this.mapMarkers);

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

    this.map.on("load", async () => {

      const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/'
      const response = await axios.get(apiEndPoint + 'locations/');

      console.log ("Transformación JSON de " + apiEndPoint + "locations a locations");
      let locations = JSON.parse(requestToList(response.data));
      
      console.log("Localizaciones que se cargan en el mapa. Variable locations: ",locations);

      this.map.addSource("places", 
      {
        type: "geojson", data: locations
      }
      );

      // Add a layer showing the places.
      this.map.addLayer({
        id: "places",
        //interactive: true,
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": ["get", "icon"],
          "icon-allow-overlap": true,
          "icon-size": 1,
        }
      });

      this.map.on("click", "places", (e: any) => {
        console.log ("this.map.on ->evento click. evento e: ", e);
        console.log ("e.features[0]: ", e.features[0]);
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const id = e.features[0].properties.id;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        this.map.flyTo({
          center: coordinates,
          zoom: 17,
        });

        this.mapMarkers.forEach((marker: any) => {
          marker.remove();
        });

        if (this.props.onFormSelect !== undefined)
          this.props.onFormSelect(false, e.lngLat.lat, e.lngLat.lng);

        if (this.props.onIconSelect !== undefined)
          this.props.onIconSelect(true, e.lngLat.lat, e.lngLat.lng, id);
        
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

    if (this.props.finishedMounting !== undefined)
      this.props.finishedMounting();
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
