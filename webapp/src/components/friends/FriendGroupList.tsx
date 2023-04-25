import React, { useState } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import "./../../pages/Friends.css";

function FriendGroupList() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  return (
    <List component={Paper} variant="outlined" square style={{marginTop:"1em", maxHeight:"60vh"}}>
      <ListItemButton>
        <ListItemText disableTypography primary="Friend group 1" onClick={handleClick1} style={{fontWeight:"bold", fontSize:"1.5em"}}/>
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4 }}>
            <ListItemIcon>
              <AccessibilityNewIcon/>
            </ListItemIcon>
            <ListItemText disableTypography primary="Manolo" style={{fontWeight:"bold", fontSize:"1.2em"}}/>
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemIcon>
              <AccessibilityNewIcon/>
            </ListItemIcon>
            <ListItemText disableTypography primary="Pepe" style={{fontWeight:"bold", fontSize:"1.2em"}}/>
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemIcon>
              <AccessibilityNewIcon/>
            </ListItemIcon>
            <ListItemText disableTypography primary="Juan" style={{fontWeight:"bold", fontSize:"1.2em"}}/>
          </ListItem>
        </List>
      </Collapse>
      <ListItemButton>
        <ListItemText disableTypography primary="Friend group 2" onClick={handleClick2} style={{fontWeight:"bold", fontSize:"1.5em"}}/>
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4 }}>
            <ListItemIcon>
              <AccessibilityNewIcon/>
            </ListItemIcon>
            <ListItemText disableTypography primary="Hernesto" style={{fontWeight:"bold", fontSize:"1.2em"}}/>
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemIcon>
              <AccessibilityNewIcon/>
            </ListItemIcon>
            <ListItemText disableTypography primary="Julian" style={{fontWeight:"bold", fontSize:"1.2em"}}/>
          </ListItem>
        </List>
      </Collapse>
    </List>
  )
}

export default FriendGroupList