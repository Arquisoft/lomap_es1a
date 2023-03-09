import placeholder_map from '../images/placeholder_map.png';
import Map from "../components/Map";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";

import "../App.css";
import "./Explore.css";

export default function Explore() {
  return (
    <article className="explorearticle">
      <div className="movingdiv">
        <div className="mapdiv" style={{ width: "60%", height: "100%", display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
          <Map
            lng={4.34878}
            lat={50.85045}
            zoom={10}
            mapWidth="100%"
            mapHeight="100%"
          />
          <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-multiline-flexible"
              label="Name"
              multiline
              maxRows={4}
            />
          </div>
        </Box>
        </div>
      </div>
    </article>
  );
}