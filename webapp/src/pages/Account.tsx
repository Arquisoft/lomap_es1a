import { useSession } from "@inrupt/solid-ui-react";
import { Navigate } from 'react-router-dom';
import "./Account.css";
import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllLocationsObject, getLocationObject } from "../util/PodUtil";
import { Location } from "../util/UserData";
import LocationList from "./LocationList";

export default function Account() {

  const { session } = useSession();
  const [selectedBtn, setSelectedBtn] = useState(1);

  let locations = async () => {
    if (session.info.webId != undefined && session.info.webId != "") {
      let aux = await getAllLocationsObject(session).then((locationsPromise) => {
        return locationsPromise;
      });
    }
    else return null;
  };

  if (session.info.isLoggedIn) {
    return (
      <div className="main-container">
        <h1 className="title">Friends</h1>
        <div className="table-selector">
          <ButtonGroup variant="contained" color="primary">
            <Button>
              Your Locations
            </Button>
          </ButtonGroup>
        </div>
        {<LocationList friends={locations} />}
      </div>
    );
  }
  else
    return (
      <Navigate to="/login"/>
    );
}