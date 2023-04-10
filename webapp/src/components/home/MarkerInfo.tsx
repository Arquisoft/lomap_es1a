import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InfoCard from "./InfoCard";
import Modal from 'react-modal';
import "./MarkerInfo.css";

interface Props {
  show: boolean;
  location: any;
  setOpen: (state: boolean) => void;
  openModal: () => void;
}

export default class MarkerInfo extends React.Component<Props> {
  name: string;
  category: string;

  state = { seen: false };

  constructor(props: any) {
    super(props);
    this.name = "";
    this.category = "shop";
  }

  render() {
    let drawerClasses = "side-drawer";

    if (this.props.show) {
      drawerClasses = "side-drawer open";
    }

    return (
      <div className={drawerClasses}>
        <div className={"closeButton"}>
          <Button color="inherit" onClick={() => this.props.setOpen(false)}>
            <CloseIcon />
          </Button>
        </div>
        <div className={"mainForm"}>
          <Typography
            variant="h4"
            component="h4"
            sx={{ fontWeight: "bold", textAlign: "center" }}
            gutterBottom
          >
            {this.props.location === undefined
              ? "not found"
              : this.props.location.name}
          </Typography>
          <div className={"infoContainer"}>
            <div style={{overflow: "hidden"}}>
              <InfoCard username="Manolo" rating={3} comments="Es un sitio muy bonito, con muchas cosas muy interesantes que me gustan mucho del lugar. Ciertamente, uno de mis lugares favoritos de la vida." />
            </div>
          </div>
          <div className={"addButton"}>
            <Button type="submit" variant="contained" color="primary" sx={{width:'100%'}} onClick={this.props.openModal}>
              Add a review
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
