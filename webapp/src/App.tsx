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
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import { green, purple } from '@mui/material/colors';

setUpNotifications({
  defaultProps: {
    position: "top-right",
    dismissible: true,
    title: "Success!",
    showDismissButton: true,
    dismissAfter: 4000,
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#121212",
      contrastText: "#fff"
    }
  },
});

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#0a1929"
    }
  }
})

export default function App(): JSX.Element {
  const { notifications, dismissNotification } = useNotifications();
  const [theme, setTheme] = useState('light')



  const changeTheme = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light');
  }

  return (
    <SessionProvider sessionId="lomap_es1a">
      <>
        <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
        <Sidenav />
        <NavBar changeTheme={changeTheme} />
        <div style={{ width: "100vw", height: "100vh" }}>
          <Routes>
            <Route path="/" element={<Home mapTheme={theme}/>} />
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
        </ThemeProvider>
      </>
    </SessionProvider>
  );
}
