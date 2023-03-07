import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import NavBar from "./components/NavBar";
import Map from "./components/Map";
import AuthWrapper from "./components/AuthWrapper";
import SideNav from "./components/Sidenav";

import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";

import { getUsers } from "./api/api";
import { User } from "./shared/shareddtypes";
import "./App.css";
import Sidenav from "./components/Sidenav";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <Sidenav/>
      <NavBar/>
      <main style={{justifyContent:"center"}}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/explore" element={<Explore />} />
          <Route path="/account" element={<Account />}/>
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}
