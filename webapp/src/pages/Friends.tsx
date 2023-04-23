import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useSession } from "@inrupt/solid-ui-react";
import { Navigate } from "react-router-dom";
import { getFriends } from "../util/PodUtil";

import type { Friend } from "../util/UserData";
import "../components/friends/FriendList";

import "./Friends.css";
import FriendList from "../components/friends/FriendList";

export default function Friends() {
  const { session } = useSession();
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    handleFriends();
  }, [friends]);

  const handleFriends = async () => {
    if (session.info.webId != undefined && session.info.webId != "") {
      let aux = await getFriends(session.info.webId).then((friendsPromise) => {
        return friendsPromise;
      });
      setFriends(aux);
    } else setFriends([]);
  };

  if (session.info.isLoggedIn) {
    return (
      <div className="main-container">
        <h1 className="title">Friends</h1>
        <FriendList friends={friends}/>
      </div>
    );
  } else return <Navigate to="/login" />;
}
