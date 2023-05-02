import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InfoCard from "./InfoCard";
import "./MarkerInfo.css";

interface Props {
  show: boolean;
  location: any;
  cardList: any;
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
              ? "Fetching data..."
              : this.props.location.name}
          </Typography>
          <div className={"infoContainer"}>
            {
              this.props.cardList !== undefined ?
              this.props.cardList.map((location:any) => 
                location !== undefined && location !== null ?
                <InfoCard key={this.props.cardList} username={location.name} rating={location.score} comments={location.comments} image={location.image} />
                : ""
              )
              : <p>Fetching data...</p>
            }
          </div>
          <div className={"addButton"}>
            <Button type="submit" variant="contained" color="primary" sx={{width:'100%'}} onClick={this.props.openModal}>
              Add info
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
