import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import axios from "axios";
import "./SideForm.css";
import { FormGroup } from "@mui/material";
import { requestToList } from '../../util/LocationParser';

interface Props {
  show: boolean;
  location: any;
  setOpen: (state: boolean) => void;
}

export default class MarkerInfo extends React.Component<Props> {
  name: string;
  category: string;

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
            variant="h6"
            component="h5"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            {this.props.location === undefined ? "not found" : this.props.location.name }
            <div>
              <Typography variant="subtitle1">
              id: {this.props.location === undefined ? "not found" : this.props.location._id }
              </Typography>
            </div>
          </Typography>
          <p>(Fetch the rest from POD)</p>
        </div>
      </div>
    );
  }
}
