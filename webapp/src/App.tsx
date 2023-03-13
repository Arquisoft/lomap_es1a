import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { SessionProvider, useSession } from "@inrupt/solid-ui-react";
import { useState } from "react";

import NavBar from "./components/NavBar";
import Sidenav from "./components/Sidenav";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Account from "./pages/Account";
import Login from "./pages/Login";



export default function App(): JSX.Element {
  const { session } = useSession();
       
  return (
    <SessionProvider sessionId="lomap_es1a">
      <>
        <Sidenav/>
        <NavBar/>
        <div style={{width:"100vw", height:"100vh"}}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/explore" element={<Explore />} />
            <Route path="/account" element={<Account />}/>
            <Route path="/friends" element={<Friends />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </>
    </SessionProvider>
  );
}
