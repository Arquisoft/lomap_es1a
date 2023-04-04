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

interface Props {
  show: boolean;
  lat?: number;
  lng?: number;
  setOpen: (state: boolean) => void;
}

export default class SideForm extends React.Component<Props> {
  name: string;
  category: string;
  comments: string;

  constructor(props: any) {
    super(props);
    this.name = "";
    this.category = "shop";
    this.comments = "";
  }

  render() {
    const handleChange = () => {};

    const handleAddLocation = async (
      event: React.FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();
      try {
        const response = await axios.post("http://localhost:5000/locations", {
          name: this.name,
          category: this.category,
          comments: this.comments,
          lat: this.props.lat,
          lng: this.props.lng
          // TODO: logged user (?)
          // TODO: is public
          // TODO: friend user list
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      this.name = "";
      this.category = "shop";
      this.comments = "";
    };

    const handleSubmit = (evt: any) => {};

    let drawerClasses = "side-drawer";

    if (this.props.show) {
      drawerClasses = "side-drawer open";
    }

    // Name
    // Category
    // Rating
    // Add
    // Popover
    return (
      <div className={drawerClasses}>
        <div className={"closeButton"}>
          <Button color="inherit" onClick={() => this.props.setOpen(false)}>
            <CloseIcon />
          </Button>
        </div>
        <form className={"mainForm"} method="post">
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: "bold", textAlign: "center" }}
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
            <TextField fullWidth id="name-field" label="Name" />
            <FormControl>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={this.category}
                label="Category"
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value={"shop"}>Shop</MenuItem>
                <MenuItem value={"restaurant"}>Restaurant</MenuItem>
                <MenuItem value={"monument"}>Monument</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              id="comments-field"
              label="Comments"
              multiline
              maxRows={4}
            />
            <FormControlLabel
            label="Public"
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
