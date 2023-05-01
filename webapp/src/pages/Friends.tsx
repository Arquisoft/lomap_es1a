import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import { useSession } from "@inrupt/solid-ui-react";
import { Navigate } from "react-router-dom";
import { getFriends } from "../util/PodUtil";

import type { Friend } from "../util/UserData";
import "../components/friends/FriendList";

import "./Friends.css";
import FriendList from "../components/friends/FriendList";
import { useNotifications } from 'reapop'
import FriendGroupList from "../components/friends/FriendGroupList";
import AddFriendGroupModal from "../components/friends/AddFriendGroupModal";
import AddFriendGroup from "../components/friends/AddFriendGroupModal";

export default function Friends() {
  const { session } = useSession();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedBtn, setSelectedBtn] = useState(1);

  const [modalIsOpen, setIsOpen] = useState(false);

  const { notify } = useNotifications();

  const showFriendGroupNotification = (name: string) => {
    notify('Friend group created successfully!');
  }

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    setFriends([]);
    if (!session || !session.info.isLoggedIn) 
      return;
    (async () => {  
      let aux = await getFriends(session.info.webId!).then((friendsPromise) => {
        return friendsPromise;
      });
      setFriends(aux); 
    })();
  }, [session, session.info.webId]);

  if (session.info.isLoggedIn) {
    return (
      <div className="main-container">
        <h1 className="title">Friends</h1>
        <div className="table-selector">
          <ButtonGroup variant="contained" color="primary">
            <Button
              color={selectedBtn === 1 ? "secondary" : "primary"}
              onClick={() => setSelectedBtn(1)}
            >
              Solid Friends
            </Button>
            <Button
              color={selectedBtn === 2 ? "secondary" : "primary"}
              onClick={() => setSelectedBtn(2)}
            >
              Friend Groups
            </Button>
          </ButtonGroup>
        </div>
        {selectedBtn == 1 ? <FriendList friends={friends} /> : <FriendGroupList modalIsOpen={modalIsOpen} closeModal={closeModal} openModal={openModal} showNotification={showFriendGroupNotification} />}
        <AddFriendGroupModal modalIsOpen={modalIsOpen} closeModal={closeModal} openModal={openModal} showNotification={showFriendGroupNotification}/>
      </div>
    );
  } else return <Navigate to="/login" />;
}
