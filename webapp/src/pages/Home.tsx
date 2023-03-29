import React, { useState } from 'react';

import Map from "../components/Map";
import Box from '@mui/material/Box';
import Filter from '../components/home/Filter';
import SideForm from '../components/home/SideForm';
import "./Home.css";

export default function Home() {

  const [showForm, setShowForm] = useState(false);

  const handleShowForm = (state: boolean) => {
    setShowForm(state)
  };

  return (
    <article className="homearticle">
      <div className="mapdiv">
        <Map lng={4.34878} lat={50.85045} zoom={10} mapWidth='100%' mapHeight='100%' onFormSelect={handleShowForm}/>
      </div>
      <div className="filterDiv">
        <Filter />
      </div>
      <div style={{width:"400px", height:"100vh", position:"absolute"}}>
        {showForm ? (
            <SideForm />
          ) : <div></div>}
      </div>
    </article>
  );
}