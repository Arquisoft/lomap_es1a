import { Link } from "react-router-dom";

import Drawer from "@mui/material/AppBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import placeholder_map from '../images/placeholder_map.png';

import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidW8yNjQ1NzgiLCJhIjoiY2xldzVmcnBhMTYxMDNzczBwczRvMm5ueSJ9.t5bV5V6yx7ES0VZKIEqDsw';

interface Props {
  lng: number;
  lat: number;
  zoom: number;
  mapWidth: string;
  mapHeight: string;
}

export default class Map extends React.Component<Props> {
  mapContainer: any;
  map: any;

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.props.lng, this.props.lat],
      zoom: this.props.zoom,
      attributionControl: false
    });
    
    this.map.on('click', (e: any) => {
      const popup = new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<div style="width: 50px; height: 50px; background-color: #F7455D;"></div>')
        .addTo(this.map);

        const marker = new mapboxgl.Marker({
          color: '#FF0000',
          draggable : false,
          
        })
        .setLngLat(e.lngLat)
        .setPopup(popup)
        .addTo(this.map);
        

        this.map.flyTo({
          center: e.lngLat,
          zoom: 17
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
        style={{width: this.props.mapWidth, height: this.props.mapHeight, overflow:"hidden"}}
      />
    );
  }
}
