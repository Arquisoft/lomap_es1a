import { useSession } from "@inrupt/solid-ui-react";
import { Navigate } from 'react-router-dom';
import "./Friends.css";

export default function Friends() {
    const { session } = useSession();

    if (session.info.isLoggedIn) {
      return (
        <div className='main-container'>
          <h1>Friends</h1>
        </div>
      );
    }
    else
      return (
        <Navigate to="/login"/>
      );
}