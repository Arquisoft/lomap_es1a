import { useSession } from "@inrupt/solid-ui-react";
import { Navigate } from 'react-router-dom';
import "./Account.css";
import FriendList from "../components/friends/FriendList";
import UserLocationList from "../components/home/UserLocationList";

export default function Account() {

  const { session } = useSession();

  if (session.info.isLoggedIn) {
    return (
      <UserLocationList/>
    );
  }
  else
    return (
      <Navigate to="/login"/>
    );
}