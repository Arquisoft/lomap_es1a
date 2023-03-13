import * as React from "react";
import placeholder_map from '../images/placeholder_map.png';
import Map from "../components/Map";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import AddLocationForm from "../components/explore/AddLocationForm";

import "../App.css";
import "./Explore.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

export default function Explore() {

  const [category, setCategory] = React.useState("");

  const handleChange = () => {};

  const handleSubmit = (evt: any) => {
  }

  return (
    <article className="explorearticle">
      <div className="movingdiv">
        <div
          style={{
            width: "fit-content",
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Map
            lng={4.34878}
            lat={50.85045}
            zoom={10}
            mapWidth="60vw"
            mapHeight="100vh"
          />
          
        </div>
        <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            style={{width:"25vw", height:"100vh", alignItems:"center", overflow:"hidden"}}
          >
            <AddLocationForm />
          </Box>
      </div>
    </article>
  );
}