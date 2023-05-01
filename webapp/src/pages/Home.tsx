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
import {initPodForLomap, saveGroup, deleteGroup,getPublicAccessRead, setPublicAccessRead} from "../../src/util/PodUtil"
import type { Friend, Group, Location} from "../../src/util/UserData";

import "./Home.css";
import { getLocationObject, getAllLocationsObject, getUserName, getFriends, getAllGroups, getAllGroupsObject, getUserRead, setUserRead, getGroupRead, setGroupRead} from '../util/PodUtil';

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
  const [cardList, setCardList] = useState<any>();

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

  }, [map, mountFinished, props.mapTheme]);

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

    let cardList = await getLocationObject(session, location._id);
    console.log ("Home.tsx -- handleShowMarkerInfo -- cardList", cardList);
    
    //console.log ("Home.tsx -- handleShowMarkerInfo -- Pruebas PODS ");
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

    /*console.log ("Home.tsx -- handleShowMarkerInfo -- Pruebas. getPublicAccessRead");
    let testGetPublicAccess:boolean | undefined = await getPublicAccessRead (session,
      "https://aagonzalez.inrupt.net/lomap/locations/6432acba6078761b6f511c1d");
    console.log ("testgetPublicAccess: ", testGetPublicAccess);*/
    /*
    //Desactivamos el permiso de lectura pública. Dataset sin acl creada
    let testSetPublicAccess = await setPublicAccessRead (session,
      "https://aagonzalez.inrupt.net/lomap/locations/6432acba6078761b6f511c1d", false);
    console.log ("Desactivado permiso de lectura pública: ", testSetPublicAccess);
    //Volvemos a consultar el valor
    let testGetPublicAccess = await getPublicAccessRead (session,
      "https://aagonzalez.inrupt.net/lomap/locations/6432acba6078761b6f511c1d");
    console.log ("Debería ser falso tras desactivarlo. testGetPublicAccess: ", testGetPublicAccess);  
      */
    
    /*
    //Desactivamos el permiso de lectura pública. Dataset con acl creada
    let testSetPublicAccess = await setPublicAccessRead (session,
      "https://aagonzalez.inrupt.net/lomap/locations/64329bd1f09bf1a2f06cb193", false);
    console.log ("Desactivado permiso de lectura pública: ", testSetPublicAccess);
    //Volvemos a consultar el valor
    let testGetPublicAccess = await getPublicAccessRead (session,
      "https://aagonzalez.inrupt.net/lomap/locations/64329bd1f09bf1a2f06cb193");
    console.log ("Debería ser falso tras desactivarlo. testGetPublicAccess: ", testGetPublicAccess);  
    */  
    
    /*
    //Prueba completa modificación ACL. Quitar permiso de lectura pública y añadir usuarios y grupos
    console.log ("iNICIO prueba completa modificación ACL. Quitar permiso de lectura pública y añadir usuarios y grupos");
    let recursoPruebaCompleta = "https://aagonzalez.inrupt.net/lomap/locations/64337eb048c1302f714702b1"
    console.log ("Recurso prueba: ", recursoPruebaCompleta);
    //  Desactivamos el permiso de lectura pública. Dataset con acl creada
    let testSetPublicAccess = await setPublicAccessRead (session, recursoPruebaCompleta, false);
    console.log ("Desactivado permiso de lectura pública.");
    //Volvemos a consultar el valor
    let testGetPublicAccess = await getPublicAccessRead (session,recursoPruebaCompleta);
    console.log ("Debería ser falso tras desactivarlo. testGetPublicAccess: ", testGetPublicAccess); 
    //  Activamos permisos del lectura a 2 usuarios
    let idUsuario1 = "https://labra2223.inrupt.net/profile/card#me"
    let idUsuario2 = "https://andresangel2.solidcommunity.net/profile/card#me"
    console.log ("Activamos permisos lectura usuario1: ", idUsuario1);
    await setUserRead(session,recursoPruebaCompleta,idUsuario1,true);
    console.log ("Activamos permisos lectura usuario2: ", idUsuario2);
    await setUserRead(session,recursoPruebaCompleta,idUsuario2,true);
    //  Comprobamos los permisos de los usuarios
    let permisoReadUsuario1:boolean|undefined = await getUserRead(session,recursoPruebaCompleta,idUsuario1)
    console.log ("Permiso Lectura usuario1 debería ser true: ", permisoReadUsuario1);
    let permisoReadUsuario2:boolean|undefined = await getUserRead(session,recursoPruebaCompleta,idUsuario2)
    console.log ("Permiso Lectura usuario2 debería ser true: ", permisoReadUsuario2);
    
    //  Activamos permisos del lectura a 2 grupos
    let idGrupo1 = "https://aagonzalez.inrupt.net/lomap/groups.ttl#grupo%20de%20todos%20los%20amigos%20del%20POD"
    let idGrupo2 = "https://aagonzalez.inrupt.net/lomap/groups.ttl#Amigos"
    console.log ("Activamos permisos lectura grupo1: ", idGrupo1);
    await setGroupRead(session,recursoPruebaCompleta,idGrupo1,true);
    console.log ("Activamos permisos lectura grupo2: ", idGrupo2);
    await setGroupRead(session,recursoPruebaCompleta,idGrupo2,true);
    //  Comprobamos los permisos de los usuarios
    let permisoReadGrupo1: boolean|undefined = await getGroupRead(session,recursoPruebaCompleta,idGrupo1)
    console.log ("Permiso Lectura grupo1 debería ser true: ", permisoReadGrupo1);
    let permisoReadGrupo2: boolean|undefined = await getGroupRead(session,recursoPruebaCompleta,idGrupo2)
    console.log ("Permiso Lectura grupo2 debería ser true: ", permisoReadGrupo2);
    console.log ("FINAL Prueba completa modificación ACL. ");
    */

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