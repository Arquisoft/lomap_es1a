import React, { useState, useEffect } from 'react';
import { useSession } from "@inrupt/solid-ui-react";
import Map from "../components/Map";
import Filter from '../components/home/Filter';
import SideForm from '../components/home/SideForm';
import MarkerInfo from '../components/home/MarkerInfo';
import AddLocationModal from '../components/home/AddLocationModal';
import { Navigate } from "react-router-dom";
import { useNotifications } from 'reapop'
import axios from "axios";
import { requestToList } from '../util/LocationParser';

import "./Home.css";
import { getLocationObject } from '../util/PodUtil';

interface Props {
  mapTheme: string;
}

export default function Home<Props>( props:any ): JSX.Element{

  const [map, setMap] = useState<any>([]);
  const [markers, setMarkers] = useState<any[]>([]);
  const [mountFinished, setMountFinished] = useState(false);

  useEffect(() => {
    console.log("CURRENT MAP:")
    console.log(props.mapTheme)
    console.log(mountFinished)
    if (mountFinished) {
      if (props.mapTheme == 'light')
        map.setStyle("mapbox://styles/alvesit0/clg86aosh005p01o5khz3eqcw");
      else
        map.setStyle("mapbox://styles/alvesit0/clgtrmdnh004001qy4ngrcyb5");
    }
    reloadMap("");
  }, [props.mapTheme]);

  const [showForm, setShowForm] = useState(false);
  const [showMarkerInfo, setShowMarkerInfo] = useState(false);

  const [formLng, setFormLng] = useState(-1);
  const [formLat, setFormLat] = useState(-1);

  const [selectedLocation, setSelectedLocation] = useState<any>();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [cardList, setCardList] = useState<any>();

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
    
    let location = response.data.data;

    setSelectedLocation(location);

    console.log("LOCATION:")
    console.log(location);

    let cardList = await getLocationObject(session, location._id);

    if (cardList != undefined)
      setCardList(cardList);
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

  const closeModal = async () => {
    setIsOpen(false);
    handleShowMarkerInfo(true, formLng, formLat, selectedLocation._id);
  }

  const finishedMounting = () => {
    setMountFinished(true);
  }

  const reloadMap = async (category:string ) => {
    console.log("RELOADING MAP...");

    const response = await axios.get("http://localhost:5000/locations/" +  category);
    let locations = JSON.parse(requestToList(response.data));
    if (map.getSource("places") == undefined) {
      map.addSource("places", {
        type: "geojson",
        data: locations,
      });
      map.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": ["get", "icon"],
          "icon-allow-overlap": true,
          "icon-size": 1,
        },
      });
    }
    var source = map.getSource("places");
      source.setData(locations);
      markers.forEach((marker: any) => {
        marker.remove();
      });
    map.removeSource("places");
  };

  return (
    <article className="homearticle">
      <div className="mapdiv">
        <Map lng={4.34878} lat={50.85045} zoom={10} mapWidth='100%' mapHeight='100%' onFormSelect={handleShowForm} onIconSelect={handleShowMarkerInfo} onMapSubmit={onMapSubmit} finishedMounting={finishedMounting} mapTheme={props.mapTheme}/>
      </div>
      <div className="filterDiv">
        <Filter toggleFriends={session.info.isLoggedIn} reloadMap={reloadMap}/>
      </div>
      <SideForm show={showForm} lat={formLat} lng={formLng} setOpen={closeForm} showNotification={showAddLocationNotification} reloadMap={reloadMap}/>
      <MarkerInfo show={showMarkerInfo} location={selectedLocation} setOpen={closeInfo} openModal={openModal} cardList={cardList}/>
      <AddLocationModal modalIsOpen={modalIsOpen} redirectToLogin={redirectToLogin} closeModal={closeModal} showNotification={showAddReviewNotification} selectedLocation={selectedLocation} />
      {redirectToLogin ? <Navigate to="/login"/> : ""}
    </article>
  );
}