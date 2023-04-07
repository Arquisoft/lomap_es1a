import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import gifBackground from '../images/bground.jpg';

import "./About.css";

export default function About() {
    return (
      <div>
        <img className="background-image" src={gifBackground}></img>
        <div className="main-container">
          <Stack component="main" justifyContent="center">
            <Container maxWidth="sm" className="title-container">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="black"
                gutterBottom
              >
                Welcome to LoMap
              </Typography>
              <Typography variant="h5" align="center" color="black" paragraph>
                Save your favourite locations and share them with your friends!
              </Typography>
            </Container>
            <Typography variant="h6" align="center" color="black" style={{ marginTop:"20vh"}}>
                Info
            </Typography>
          </Stack>
        </div>
      </div>
    );
}