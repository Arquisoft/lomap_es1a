import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState } from 'react';
import mapboxgl, { DoubleClickZoomHandler, Marker } from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidW8yNjQ1NzgiLCJhIjoiY2xldzVmcnBhMTYxMDNzczBwczRvMm5ueSJ9.t5bV5V6yx7ES0VZKIEqDsw';

interface Props {
  lng: number;
  lat: number;
  zoom: number;
  mapWidth: string;
  mapHeight: string;
  onFormSelect?: (state: boolean, lat: number, lon: number) => void;
}

export default class Map extends React.Component<Props> {
  mapContainer: any;
  map: any;
  mapMarkers: Array<any> = [];

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [this.props.lng, this.props.lat],
      zoom: this.props.zoom,
      attributionControl: false,
    });

    this.map.doubleClickZoom.disable();
    
    this.map.on('click', (e: any) => {
      this.mapMarkers.forEach((marker: any) => {
        marker.remove()
      });

      if (this.props.onFormSelect != undefined)
        this.props.onFormSelect(true, e.lngLat.lat, e.lngLat.lng);

      this.map.flyTo({
        center: e.lngLat,
        zoom: 17
      });
      
      const popup = new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        // .setHTML('<form id="popup-form" style="font-size: 16px; width: 300px;"><label htmlFor="name">Nombre</label><input type="text" name="name" required /><input type="hidden" name="coordinates" value="${JSON.stringify(e.lngLat)}" /><button type="submit"> Enviar</button></form>');
        
      const marker = new Marker({ color: '#FF0000', draggable: false })
        .setLngLat(e.lngLat)
        .addTo(this.map);

      this.mapMarkers.push(marker);
      marker.setPopup(popup);

      console.log('Marker coordinates:', marker.getLngLat());
      console.log('Popup coordinates:', popup.getLngLat());
      
      // marker.togglePopup();
        
      });

      // this.map.on('dblclick', (e: any) => {
      //   e.togglePopup();
      // });
  }
  
  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div
        ref={(el) => (this.mapContainer = el)}
        style={{width: this.props.mapWidth, height: this.props.mapHeight, overflow:"hidden"}}
      />
    );
  }
}
