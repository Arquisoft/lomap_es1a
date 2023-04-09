import React, { useState, useEffect } from 'react';
import { useSession } from "@inrupt/solid-ui-react";
import Map from "../components/Map";
import Box from '@mui/material/Box';
import Filter from '../components/home/Filter';
import SideForm from '../components/home/SideForm';
import MarkerInfo from '../components/home/MarkerInfo';
import { useNotifications } from 'reapop'
import axios from "axios";
import { requestToList } from '../util/LocationParser';

import "./Home.css";

export default function Home() {

  const [map, setMap] = useState<any>([]);
  const [markers, setMarkers] = useState<any[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [showMarkerInfo, setShowMarkerInfo] = useState(false);

  const [formLng, setFormLng] = useState(-1);
  const [formLat, setFormLat] = useState(-1);

  const { session } = useSession();

  const { notify } = useNotifications();

  const handleShowForm = (state: boolean, lat: number, lng: number) => {
    if (session.info.isLoggedIn) {
      setShowForm(state);
      setFormLng(lng);
      setFormLat(lat);
    }
  };

  const handleShowMarkerInfo = (state: boolean, lat: number, lng: number) => {
    setShowMarkerInfo(state);
    setFormLng(lng);
    setFormLat(lat);
  };

  const closeForm = (state: boolean) => {
    setShowForm(state);
  }

  const closeInfo = (state: boolean) => {
    setShowMarkerInfo(state);
  }

  const showNotification = (name: string) => {
    notify('Location added: ' + name);
  }

  const onMapSubmit = (map:any, markers:any[]) => {
    setMap(map);
    setMarkers(markers);
  }

  const reloadMap = async () => {
    var source = map.getSource('places');
    const response = await axios.get("http://localhost:5000/locations");
    let locations = JSON.parse(requestToList(response.data));
    source.setData(locations);
    markers.forEach((marker: any) => {
      marker.remove();
    });
  }

  return (
    <article className="homearticle">
      <div className="mapdiv">
        <Map lng={4.34878} lat={50.85045} zoom={10} mapWidth='100%' mapHeight='100%' onFormSelect={handleShowForm} onIconSelect={handleShowMarkerInfo} onMapSubmit={onMapSubmit}/>
      </div>
      <div className="filterDiv">
        <Filter toggleFriends={session.info.isLoggedIn} />
      </div>
      <SideForm show={showForm} lat={formLat} lng={formLng} setOpen={closeForm} showNotification={showNotification} reloadMap={reloadMap}/>
      <MarkerInfo show={showMarkerInfo} lat={formLat} lng={formLng} setOpen={closeInfo} />
    </article>
  );
}