import React, { useState, useEffect } from 'react';
import { useSession } from "@inrupt/solid-ui-react";
import Map from "../components/Map";
import Filter from '../components/home/Filter';
import SideForm from '../components/home/SideForm';
import MarkerInfo from '../components/home/MarkerInfo';
import { useNotifications } from 'reapop'
import axios from "axios";
import { requestToList } from '../util/LocationParser';
import { Navigate } from 'react-router-dom';
import Modal from 'react-modal';

import "./Home.css";

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {zIndex: 15}
};

export default function Home() {

  const [map, setMap] = useState<any>([]);
  const [markers, setMarkers] = useState<any[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [showMarkerInfo, setShowMarkerInfo] = useState(false);

  const [formLng, setFormLng] = useState(-1);
  const [formLat, setFormLat] = useState(-1);

  const [selectedLocation, setSelectedLocation] = useState<any>();

  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const { session } = useSession();

  const { notify } = useNotifications();

  const [modalIsOpen, setIsOpen] = React.useState(false);

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

  const showNotification = (name: string) => {
    notify('Location added: ' + name);
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

  const afterOpenModal = () => {
    
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
      <SideForm show={showForm} lat={formLat} lng={formLng} setOpen={closeForm} showNotification={showNotification} reloadMap={reloadMap}/>
      <MarkerInfo show={showMarkerInfo} location={selectedLocation} setOpen={closeInfo} openModal={openModal} modalIsOpen={modalIsOpen}/>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add a review"
      >
        <h1>TODO: Create a form here</h1>
      </Modal>
      {redirectToLogin ? <Navigate to="/login" /> : ""}
    </article>
  );
}