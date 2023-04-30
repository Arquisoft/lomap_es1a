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
import {initPodForLomap, saveGroup, deleteGroup, getLocationsFromFriends} from "../../src/util/PodUtil"
import type { Friend, Group, Location} from "../../src/util/UserData";

import "./Home.css";
import { getLocationObject, getAllLocationsObject, getUserName, getFriends, getAllGroups, getAllGroupsObject} from '../util/PodUtil';

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

  useEffect(() => {
    console.log("Home.tsx -- useEffect");
    console.log("CURRENT MAP:")
    console.log(props.mapTheme)
    console.log(mountFinished)
    if (mountFinished) {
      if (props.mapTheme == 'light')
        map.setStyle("mapbox://styles/alvesit0/clg86aosh005p01o5khz3eqcw");
      else
        map.setStyle("mapbox://styles/alvesit0/clgtrmdnh004001qy4ngrcyb5");
    }
    reloadMap();

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
    setShowMarkerInfo(state);
    setFormLng(lng);
    setFormLat(lat);
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    const response = await axios.get(apiEndPoint + "locations/info/" + id);
    
    let location = response.data.data;

    setSelectedLocation(location);

    console.log("LOCATION:")
    console.log(location);

    let newCardList:any[] = [];
    newCardList.push(await getLocationObject(session, location._id));
    let friendCardList:any[] = await getLocationsFromFriends(session, location._id);
    console.log("LOCATIONS FROM FRIENDS")
    console.log(friendCardList);
    console.log(newCardList)
    friendCardList.map((location:any) => {
      newCardList.push(location);
      console.log(newCardList)
    })

    console.log("NEWCARDLIST")
    console.log(newCardList)

    if (newCardList != undefined)
      setCardList(newCardList);
      

    // console.log("LOCATION:")
    // console.log(location);
// 
    // let cardList:any[] = [];
    // cardList.push(await getLocationObject(session, location._id))
    // const locationA = await getLocationObject(session, location._id);
    // console.log(locationA);
// 
    // console.log ("Home.tsx -- handleShowMarkerInfo -- cardList", cardList);
  // 
    // console.log ("Home.tsx -- handleShowMarkerInfo -- Pruebas PODS ");
    // console.log("##### ADD FRIENDS: #####")
    // const friendLocations = await getLocationsFromFriends(session, location._id);
    // console.log(friendLocations[0].category);
    // friendLocations.forEach((location:any) => {
    //   cardList.push(location);
    // });
    // 
    // console.log("FIRST ELEMENT")
    // console.log(cardList);
    // if (cardList[0] != null)
    //   console.log(cardList[0]);
// 
    // if (cardList != undefined)
    //   setCardList(cardList);

    
    //Pruebas varias de los métodos del pod. 
    //1 Llamo aqui a obtener toda la lista de locations
    //let locations = await getAllLocationsObject(session);
    //console.log ("Home.tsx -- handleShowMarkerInfo -- Pruebas. Lista de todas las localizaciones", locations);
    //2. Conseguir el nombre de usuario del pod
    //let userName = await getUserName(session);
    //console.log ("Home.tsx -- handleShowMarkerInfo -- Pruebas. getUserName", userName);
    //let groups = await getAllGroups(session);
    //console.log ("Home.tsx -- handleShowMarkerInfo -- Pruebas. getAllGroups", groups);
    //let groups = await getAllGroupsObject(session);
    //console.log ("Home.tsx -- handleShowMarkerInfo -- Pruebas. getAllGroupsObject", groups);
    
    //let friends = await getFriends(session.info.webId!);
    //console.log ("Home.tsx -- handleShowMarkerInfo -- Pruebas. getFriends", friends);
    
    /*
    console.log ("Home.tsx -- handleShowMarkerInfo -- Pruebas. SaveGroup");
    let pruebaGrupoNuevo:Group = {
      name: "grupoTodos",
      members: friends
    }

    console.log ("Home.tsx -- handleShowMarkerInfo -- Pruebas. SaveGroup con espacios en el nombre");
    let pruebaGrupoEspaciosNombre:Group = {
      name: "grupo de todos los amigos del POD",
      members: friends
    }

    let grupoGuardado = await saveGroup(session, pruebaGrupoEspaciosNombre);
    console.log ("Home.tsx -- handleShowMarkerInfo -- Pruebas. grupoGuardado: ",grupoGuardado);

    console.log ("Home.tsx -- handleShowMarkerInfo -- Pruebas. borrar el grupo: ");
    let gruposDespuesBorrar = await deleteGroup(session, pruebaGrupoNuevo);
    console.log ("Home.tsx -- handleShowMarkerInfo -- Pruebas. Grupos despues de borrar : ",gruposDespuesBorrar);
    */
    

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

  const reloadMap = async () => {
    console.log("RELOADING MAP...");
    //var source = map.getSource('places');
    
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/';
    const response = await axios.get(apiEndPoint + "locations/");
    console.log("Home.tsx - reloadMap - apiEndPoint:",apiEndPoint);
    console.log("Home.tsx - reloadMap - response:",response);
    
    let locations = JSON.parse(requestToList(response.data));
    console.log("Home.tsx - reloadMap - locations:",locations);
    
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
        <Filter toggleFriends={session.info.isLoggedIn} />
      </div>
      <SideForm show={showForm} lat={formLat} lng={formLng} setOpen={closeForm} showNotification={showAddLocationNotification} reloadMap={reloadMap}/>
      <MarkerInfo show={showMarkerInfo} location={selectedLocation} setOpen={closeInfo} openModal={openModal} cardList={cardList}/>
      <AddLocationModal modalIsOpen={modalIsOpen} redirectToLogin={redirectToLogin} closeModal={closeModal} showNotification={showAddReviewNotification} selectedLocation={selectedLocation} />
      {redirectToLogin ? <Navigate to="/login"/> : ""}
    </article>
  );
}