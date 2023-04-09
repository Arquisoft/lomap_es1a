import React, { useEffect, useState } from "react";
import { getSolidDataset, getUrlAll, getThing } from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import { Navigate } from 'react-router-dom';
import {getFriends} from "../util/PodUtil";
import type { Friend } from "../util/model/UserData";

import "./Friends.css";

export default function Friends() {
    const { session } = useSession();
    const [friends, setFriends] = useState<Friend[]>([]);

    useEffect(() => {
      handleFriends()
    }, 
    [friends]);

    const handleFriends = async () => {
      if (session.info.webId != undefined && session.info.webId != ""){
        const temp = await getFriends(session.info.webId).then(friendsPromise => {return friendsPromise});
        setFriends(temp);
      }
      else{
        setFriends([]);
      }
    }

    if (session.info.isLoggedIn) {
      return (
        <div className='main-container'>
          <h1>Friends</h1>
          <ul>
            {
              friends.map(f => <li>{f.name}</li>)
            }
          </ul>
        </div>
      );
    }
    else
      return (
        <Navigate to="/login"/>
      );
}