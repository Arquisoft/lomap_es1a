import React, { useState, useEffect } from 'react';
import { useSession } from "@inrupt/solid-ui-react";
import Map from "../components/Map";
import Filter from '../components/home/Filter';
import SideForm from '../components/home/SideForm';
import MarkerInfo from '../components/home/MarkerInfo';
import AddLocationModal from '../components/home/AddLocationModal';
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

  const [selectedLocation, setSelectedLocation] = useState<any>();

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const { session } = useSession();

  const { notify } = useNotifications();

  const handleShowForm = (state: boolean, lat: number, lng: number) => {
    if (session.info.isLoggedIn) {
      setShowForm(state);
      setFormLng(lng);
      setFormLat(lat);
    }
  };

  const handleShowMarkerInfo = async (state: boolean, lat: number, lng: number, id:string) => {
    setShowMarkerInfo(state);
    setFormLng(lng);
    setFormLat(lat);
    
    const response = await axios.get("http://localhost:5000/locations/info/"+id);
    console.log(response);
    
    let location = response.data.data;

    console.log(location);

    setSelectedLocation(location);
  };

  const closeForm = (state: boolean) => {
    setShowForm(state);
  }

  const closeInfo = (state: boolean) => {
    setShowMarkerInfo(state);
  }

  const showAddLocationNotification = (name: string) => {
    notify('Location added: ' + name);
  }

  const showAddReviewNotification = (name: string) => {
    notify('Review added successfully!');
  }

  const onMapSubmit = (map:any, markers:any[]) => {
    setMap(map);
    setMarkers(markers);
  }

  const openModal = () => {
    if (session.info.isLoggedIn == true)
      setIsOpen(true);
    else
      setRedirectToLogin(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const reloadMap = async () => {
    var source = map.getSource('places');
    const response = await axios.get("http://localhost:5000/locations/");
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
      <SideForm show={showForm} lat={formLat} lng={formLng} setOpen={closeForm} showNotification={showAddLocationNotification} reloadMap={reloadMap}/>
      <MarkerInfo show={showMarkerInfo} location={selectedLocation} setOpen={closeInfo} openModal={openModal}/>
      <AddLocationModal modalIsOpen={modalIsOpen} redirectToLogin={redirectToLogin} closeModal={closeModal} showNotification={showAddReviewNotification} />
    </article>
  );
}