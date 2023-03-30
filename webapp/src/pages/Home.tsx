import React, { useState } from 'react';

import Map from "../components/Map";
import Box from '@mui/material/Box';
import Filter from '../components/home/Filter';
import SideForm from '../components/home/SideForm';
import "./Home.css";

export default function Home() {

  const [showForm, setShowForm] = useState(false);

  const [formLng, setFormLng] = useState(-1);
  const [formLat, setFormLat] = useState(-1);

  const handleShowForm = (state: boolean, lat: number, lng: number) => {
    setShowForm(state);
    setFormLng(lng);
    setFormLat(lat);
  };

  const closeForm = (state: boolean) => {
    console.log("Current state: ", showForm);
    setShowForm(state);
    console.log("Current state: ", showForm);
  }

  return (
    <article className="homearticle">
      <div className="mapdiv">
        <Map lng={4.34878} lat={50.85045} zoom={10} mapWidth='100%' mapHeight='100%' onFormSelect={handleShowForm}/>
      </div>
      <div className="filterDiv">
        <Filter />
      </div>
      <SideForm show={showForm} lat={formLat} lon={formLng} setOpen={closeForm} />
    </article>
  );
}