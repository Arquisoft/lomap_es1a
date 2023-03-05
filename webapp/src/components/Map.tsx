import { Link } from "react-router-dom";

import Drawer from "@mui/material/AppBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import placeholder_map from '../images/placeholder_map.png';

type MapProps = {
    // TODO: None yet
}

export default function Map(props: MapProps): JSX.Element {
    return (
        <img width="600" height="500" src={placeholder_map} alt="Map" />
    );
};