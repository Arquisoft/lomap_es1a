import { useState, useEffect } from 'react';
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
import {initPodForLomap} from "../../src/util/PodUtil"

import "./Home.css";
import { getLocationObject, getFriends, getLocationFromFriend } from '../util/PodUtil';
import React from 'react';

interface Props {
  mapTheme: string;
}

export default function Home<Props>( props:any ): JSX.Element{
  const { session } = useSession();
  const [map, setMap] = useState<any>([]);
  const [markers, setMarkers] = useState<any[]>([]);
  const [mountFinished, setMountFinished] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [showMarkerInfo, setShowMarkerInfo] = useState(false);

  const [formLng, setFormLng] = useState(-1);
  const [formLat, setFormLat] = useState(-1);

  const [selectedLocation, setSelectedLocation] = useState<any>();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [cardList, setCardList] = useState<any>([]);

  const { notify } = useNotifications();

  const [toggleFilter, setToggleFilter] = useState(false);
  const handleFilterFriends = () => {
    setToggleFilter(!toggleFilter);
    reloadMap("");
  }

  useEffect(() => {
    console.log("Home.tsx -- useEffect");
    console.log("CURRENT MAP:")
    console.log(props.mapTheme)
    console.log(mountFinished)
    if (mountFinished) {
      if (props.mapTheme === 'light')
        map.setStyle("mapbox://styles/alvesit0/clg86aosh005p01o5khz3eqcw");
      else
        map.setStyle("mapbox://styles/alvesit0/clgtrmdnh004001qy4ngrcyb5");
    }
    reloadMap("");

  }, [props.mapTheme]);

  useEffect(() => {
    //Cuando se inicia sesión en un POD comprobamos si ya están creados los contenedores y los dataset necesarios para LOMAP
    console.log("Home.tsx -- useEffect() -- session.info.isLoggedIn; ", session.info.isLoggedIn);
    if (!session || !session.info.isLoggedIn) return;
    (async () => {  
      console.log("Home.tsx -- Crear contenedores y dataset en el POD tras login si no existen");
      initPodForLomap(session); //prueba sin await
    })();
  }, [session, session.info.isLoggedIn]);

  const handleShowForm = (state: boolean, lat: number, lng: number) => {
    if (session.info.isLoggedIn) {
      setShowForm(state);
      setFormLng(lng);
      setFormLat(lat);
    }
  };

  const handleShowMarkerInfo = async (state: boolean, lat: number, lng: number, id:string) => {
    setCardList(undefined);
    setShowMarkerInfo(state);
    setFormLng(lng);
    setFormLat(lat);
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    const response = await axios.get(apiEndPoint + "locations/info/" + id);
    
    let location = response.data.data;
    console.log ("  ----  Home.tsx -- handleShowMarkerInfo -- location desde axios: ",location);

    setSelectedLocation(location);

    let newCardList:any[] = [];

    newCardList.push(await getLocationObject(session, location._id));
    //console.log ("  ----  Home.tsx -- handleShowMarkerInfo -- newCardList despues de añadir el primero: ",newCardList);
    let friends = await getFriends(session.info.webId!);
    //console.log ("  ----  Home.tsx -- handleShowMarkerInfo -- friends: ",friends);
    for (let i = 0; i < friends.length; i++) {
      //console.log ("  ----  Home.tsx -- handleShowMarkerInfo -- dentro bucle for frineds[i]: ",friends[i]);
      newCardList.push(await getLocationFromFriend(session, friends[i], location._id))  
      if (i === friends.length - 1)
        setCardList(newCardList);
    }
    if (friends.length == 0){
      setCardList(newCardList);
    }
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
    if (session.info.isLoggedIn === true)
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

  const reloadMap = async (category:string) => {
    console.log("RELOADING MAP...");
    //var source = map.getSource('places');
    
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/';
    const response = await axios.get(apiEndPoint + "locations/" + category);
    console.log("Home.tsx - reloadMap - apiEndPoint:",apiEndPoint);
    console.log("Home.tsx - reloadMap - response:",response);
    
    
    if(toggleFilter){
      console.log(response.data);
    }
    let locations = JSON.parse(requestToList(response.data));
    console.log("Home.tsx - reloadMap - locations:",locations);
    
    if (map.getSource("places") === undefined) {
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
        <Filter toggleFriends={session.info.isLoggedIn} reloadMap={reloadMap} toggleFilter={handleFilterFriends}/>
      </div>
      <SideForm show={showForm} lat={formLat} lng={formLng} setOpen={closeForm} showNotification={showAddLocationNotification} reloadMap={reloadMap}/>
      <MarkerInfo show={showMarkerInfo} location={selectedLocation} setOpen={closeInfo} openModal={openModal} cardList={cardList}/>
      <AddLocationModal modalIsOpen={modalIsOpen} redirectToLogin={redirectToLogin} closeModal={closeModal} showNotification={showAddReviewNotification} selectedLocation={selectedLocation} />
      {redirectToLogin ? <Navigate to="/login"/> : ""}
    </article>
  );
}