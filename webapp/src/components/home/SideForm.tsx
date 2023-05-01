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
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { FormGroup } from "@mui/material";
import { useSession } from "@inrupt/solid-ui-react";
import type { Location } from "../../util/UserData";
import {saveLocation} from "../../util/PodUtil";
import { Session } from "@inrupt/solid-client-authn-browser";
import "./SideForm.css"


interface Props {
  show: boolean;
  lat?: number;
  lng?: number;
  setOpen: (state: boolean) => void;
  showNotification: (name: string) => void;
  reloadMap: (category:string) => void;
}

interface State {
  name: string;
  category: string;
  comments: string;
  submitted: boolean;
}

export default class SideForm extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      category: "shop",
      comments: "none",
      submitted: false,
    };
  }
  
  render() {
    const handleCategoryChange = (event: SelectChangeEvent) => {
      this.setState({ category: event.target.value as string });
    };

    const handleNameChange = (event: any) => {
      this.setState({ name: event.target.value as string });
    };

    const onSubmit = async (e: any) => {
      e.preventDefault();
      const data:Location = {
        name: this.state.name,
        category: this.state.category,
        latitud: this.props.lat,
        longitud: this.props.lng,
      };
      try {
        const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/'
        const res = await axios.post(apiEndPoint+'locations', data);
        console.log(res.data);
      } catch (err: any) {
        console.log(err);
      }
      this.setState({ submitted: false });
      this.props.setOpen(false);
      this.props.showNotification(this.state.name);
      this.props.reloadMap("");
    };

    let drawerClasses = "side-drawer";

    if (this.props.show) {
      drawerClasses = "side-drawer open";
    }

    return (
      <div className={drawerClasses}>
        <div className={"sideform-closeButton"}>
          <Button color="inherit" onClick={() => this.props.setOpen(false)}>
            <CloseIcon />
          </Button>
        </div>
        <form className={"mainForm"} onSubmit={onSubmit}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Add a location
          </Typography>
          <Typography
            variant="h6"
            component="h5"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            <div>
              Selected coordinates
              <Typography variant="subtitle1">
                lat: {this.props.lat == -1 ? "undefined" : this.props.lat} -
                lng: {this.props.lng == -1 ? "undefined" : this.props.lng}
              </Typography>
            </div>
          </Typography>
          <FormGroup className={"sideform-formGroup"}>
            <TextField
              fullWidth
              id="name-field"
              label="Name"
              value={this.state.name}
              onChange={handleNameChange}
            />
            <FormControl>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={this.state.category}
                label="Category"
                onChange={handleCategoryChange}
                fullWidth
              >
                <MenuItem value={"shop"}>Shop</MenuItem>
                <MenuItem value={"restaurant"}>Restaurant</MenuItem>
                <MenuItem value={"monument"}>Monument</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={"sideform-addButton"}
          >
            Add
          </Button>
        </form>
      </div>
    );
  }
}
