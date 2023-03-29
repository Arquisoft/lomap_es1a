import React, {useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import "./SideForm.css";

interface Props {
  show: boolean;
  lat?: number;
  lon?: number;
}

export default class SideForm extends React.Component<Props> {
  render() {
    let showForm = this.props.show;
    const closeForm = () => {
      showForm = false;
    }

    let drawerClasses = "side-drawer";
    if (showForm) {
      drawerClasses = "side-drawer open";
    }

    return (
      <div className={drawerClasses}>
        <form className={"mainForm"} method="post">
          <Button color="inherit" onClick={closeForm}><CloseIcon/></Button>
          <p>
            lat: {this.props.lat == -1 ? "undefined" : this.props.lat} - lng: {this.props.lon == -1 ? "undefined" : this.props.lon}
          </p>
        </form>
      </div>
    );
  }
}
