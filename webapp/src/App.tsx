import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { SessionProvider, useSession } from "@inrupt/solid-ui-react";
import { useState } from "react";

import NavBar from "./components/NavBar";
import Sidenav from "./components/Sidenav";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Account from "./pages/Account";
import Login from "./pages/Login";
import About from "./pages/About";
import NotificationsSystem, {
  atalhoTheme,
  setUpNotifications,
  useNotifications,
} from "reapop";

setUpNotifications({
  defaultProps: {
    position: "top-right",
    dismissible: true,
    title: "Success!",
    showDismissButton: true,
    dismissAfter: 5000,
  },
});

export default function App(): JSX.Element {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <SessionProvider sessionId="lomap_es1a">
      <>
        <Sidenav />
        <NavBar />
        <div style={{ width: "100vw", height: "100vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <NotificationsSystem
          notifications={notifications}
          dismissNotification={(id) => dismissNotification(id)}
          theme={atalhoTheme}
        />
      </>
    </SessionProvider>
  );
}
