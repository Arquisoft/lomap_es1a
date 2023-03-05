import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import styles from './navbar.module.css';
import { Typography } from '@mui/material';


export default function SearchAppBar(): JSX.Element {
  return (
    <AppBar className={styles.appbar}>
      <Toolbar className={styles.navbar}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 0.95, textAlign: "left" }}>
            LoMap
          </Typography>
          <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}