import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import styles from './navbar.module.css';
import { Typography } from '@mui/material';
import { CombinedDataProvider, useSession, LogoutButton, Text } from "@inrupt/solid-ui-react";
import { useNavigate } from "react-router-dom";

function Name(): JSX.Element {
  const { session } = useSession();
  return (
    <>
      {session.info.webId ? (
        <CombinedDataProvider 
          datasetUrl={session.info.webId} 
          thingUrl={session.info.webId}>
          
          <Typography variant="button" component="div" >
            <Text properties={[
                "http://www.w3.org/2006/vcard/ns#fn",
                "http://xmlns.com/foaf/0.1/name"
              ]}
            />
          </Typography>  
        </CombinedDataProvider>
      )
        : null 
      }
  </>
  );
}

export default function SearchAppBar(): JSX.Element {
  const { session } = useSession();
  
  const navigate = useNavigate();
  const clickLogin= () => navigate("/login");
  
  return (
    <AppBar className={styles.appbar}>
      <Toolbar className={styles.navbar}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 0.95, textAlign: "left" }}>
            LoMap
          </Typography>
          
          {session.info.isLoggedIn ? (
            <>
              <Name />
              <LogoutButton >
                <Button color="inherit"> Logout </Button>
              </LogoutButton>
            </>
          ) : (
            <Button color="inherit" onClick={clickLogin}>Login</Button>
          )
          }
          
      </Toolbar>
    </AppBar>
  );
  

}