import { useSession } from "@inrupt/solid-ui-react";
import { Navigate } from 'react-router-dom';
import "./Account.css";

export default function Account() {

  const { session } = useSession();

  if (session.info.isLoggedIn) {
    return (
      <div className='main-container'>
        <h1>Account</h1>
      </div>
    );
  }
  else
    return (
      <Navigate to="/login"/>
    );
}