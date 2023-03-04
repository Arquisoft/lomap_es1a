import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import EmailForm from './components/EmailForm';
import Welcome from './components/Welcome';
import UserList from './components/UserList';
import NavBar from './components/NavBar';
import Map from './components/Map';
import AuthWrapper from './components/AuthWrapper';

import  {getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import './App.css';

function App(): JSX.Element {

  const [users,setUsers] = useState<User[]>([]);

  const refreshUserList = async () => {
    setUsers(await getUsers());
  }

  useEffect(()=>{
    refreshUserList();
  },[]);

  return (
    <Container>
      <NavBar/>
      
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to the homepage
      </Typography>
      <Map/>
      
    </Container>
  );
}

export default App;
