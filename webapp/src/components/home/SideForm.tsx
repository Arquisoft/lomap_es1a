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
import "./SideForm.css";
import { FormGroup } from "@mui/material";
import { useSession } from "@inrupt/solid-ui-react";
import type { Location } from "../../util/model/UserData";
import {saveLocation,pruebas} from "../../util/PodUtil";
import { Session } from "@inrupt/solid-client-authn-browser";


interface Props {
  show: boolean;
  lat?: number;
  lng?: number;
  setOpen: (state: boolean) => void;
  session: Session
}

interface State { 
  name: string,
  category: string,
  comments: string,
  submitted: boolean
};

export default class SideForm extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      category: "shop",
      comments: "",
      submitted: false
    }
  }
  
  render() {

    const handleCategoryChange = (event: SelectChangeEvent) => {
      this.setState({category: event.target.value as string});
    };

    const handleNameChange = (event: any) => {
      this.setState({name: event.target.value as string});
    };

    const handleCommentsChange = (event: any) => {
      this.setState({comments: event.target.value as string});
    };

    const onSubmit = async (e:any) => {
      e.preventDefault();
      const data:Location = {
        name: this.state.name,
        category: this.state.category,
        comments: this.state.comments, 
        //Los comentarios se tienen que almacenar en el POD.
        latitud: this.props.lat,
        longitud: this.props.lng
      }
      console.log("location antes de guardar en bbdd:", data);
      try {
  
        const res = await axios.post('http://localhost:5000/locations', data);
        
        //Obtenemos el id de la localización y lo guardamos en la localización
        data.id = res.data.location._id;
        console.log("location tras guardar en bbdd:", data);

        //Guardamos ahora en el pod
        const locationPod = await saveLocation(this.props.session,data);
        console.log("location guardada en el pod como thing:", locationPod);

      } catch (err:any) {
        console.log(err);
      }

      this.setState({submitted: false})
      this.props.setOpen(false);
    };

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
        <form className={"mainForm"} onSubmit={onSubmit}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{fontWeight: "bold", textAlign: "center" }}
          >
            Add a location
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", textAlign: "center"}}
          >
            Selected coordinates
            <Typography variant="subtitle1" >
              lat: {this.props.lat == -1 ? "undefined" : this.props.lat} - lng:{" "}
              {this.props.lng == -1 ? "undefined" : this.props.lng}
            </Typography>
          </Typography>
          <FormGroup className={"formGroup"}>
            <TextField fullWidth id="name-field" label="Name" value={this.state.name} onChange={handleNameChange} />
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
            <TextField fullWidth id="comments-field" label="Comments" value={this.state.comments} onChange={handleCommentsChange} />
            <FormControlLabel
            label="Private"
            control={<Switch/>}
            />
          </FormGroup>
          <Button type="submit" variant="contained" color="primary" className={"addButton"}>
            Add
          </Button>
        </form>
      </div>
    );
  }
}
