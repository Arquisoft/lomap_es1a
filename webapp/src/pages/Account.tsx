import { useState, useEffect } from 'react';
import { useSession } from "@inrupt/solid-ui-react";
import { Navigate } from 'react-router-dom';
import "./Account.css";
import UserLocationList from "../components/account/UserLocationList";
import { getAllLocationsObject } from "../../src/util/PodUtil"
import { Location } from "../../src/util/UserData"

export default function Account() {

  const { session } = useSession();

  const [locations, setLocations] = useState<any>([]);

  useEffect(() => {
    setLocations([]);
    
    if (!session || !session.info.isLoggedIn) return;
    (async () => {
      setLocations(await getAllLocationsObject(session));
    })();
  }, [session, session.info.webId]);

  if (session.info.isLoggedIn) {
    return (
      <UserLocationList locations={locations} />
    );
  }
  else
    return (
      <Navigate to="/login"/>
    );
}