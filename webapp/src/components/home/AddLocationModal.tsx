import Modal from "react-modal";
import  { useState, useEffect } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./AddLocationModal.css";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import Checkbox from "@mui/material/Checkbox";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { getFriends, saveLocation, getAllGroupsObject } from "../..//util/PodUtil";
import type { Friend, Group } from "../../util/UserData";

Modal.setAppElement("#root");

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column" as "column",
    width: "50%",
    height: "60%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    zIndex: 15,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

interface Props {
  modalIsOpen: boolean;
  redirectToLogin: boolean;
  selectedLocation: any;
  closeModal: () => void;
  showNotification: () => void;
}

export default function AddLocationModal<Props>(props: any): JSX.Element {
  const { session } = useSession();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendGroups, setFriendGroups] = useState<Group[]>([]);
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState<number>(1);
  const [image, setImage] = useState<File>();
  const [checked, setChecked] = useState<any>([]);

  const handleCheck = (event:any) => {
    var updatedList:any = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    console.log("CHECK LIST:")
    console.log(checked);
  };

  useEffect(() => {
    setFriendGroups([]);
    if (!session || !session.info.isLoggedIn) return;
    (async () => {
      setFriendGroups(await getAllGroupsObject(session));
    })();

    setFriends([]);
    if (!session || !session.info.isLoggedIn) 
      return;
    (async () => {  
      let aux = await getFriends(session.info.webId!).then((friendsPromise) => {
        return friendsPromise;
      });
      setFriends(aux); 
    })();
  }, [session, session.info.webId]);
 
  const handleRatingChange = async (e:any) => {
    setRating(e.target.value);
  }

  const handleCommentsChange = async (e:any) => {
    setComments(e.target.value);
  }

  const handleImageUpload = async (e:any) => {
    setImage(e.target.files[0]);
  }

  const handleSubmit = async () => {
    await saveLocation(session, {
        name: props.selectedLocation.name,
        category: props.selectedLocation.category,
        id: props.selectedLocation._id,
        nameLocation: props.selectedLocation.name,
        comments: comments,
        score: rating,
        latitud: parseFloat(props.selectedLocation.latitud),
        longitud: parseFloat(props.selectedLocation.longitud),
        image: image
    }, checked).then(() => {
      props.closeModal();
      props.showNotification();
    }
    );
  };

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      style={modalStyle}
      contentLabel="Add a review"
    >
      <div className="form-title">
        <h1>Add a review</h1>
      </div>
      <div className="forms-container">
        <div className="pod-form">
          <div className="rating-div">
            <h3>Rating:</h3>
            <Rating name="size-large" defaultValue={2} size="large" value={rating} onChange={handleRatingChange}/>
          </div>
          <TextField
            id="comments"
            label="Comments"
            variant="filled"
            multiline
            fullWidth
            rows={5}
            value={comments}
            onChange={handleCommentsChange}
          />
          <div className="image-div">
            <h3>Image:</h3>
            <div style={{display:"flex", alignItems:"center"}}>
              <Typography
              variant="subtitle1">
                {image === undefined ? "No image selected" : image.name}
              </Typography>
              <Button variant="contained" component="label" style={{marginLeft:"0.5em"}}>
                Upload File
                <input type="file" onChange={handleImageUpload} hidden />
              </Button>
            </div>
          </div>
        </div>
        <div className="friend-list">
          <h2 style={{ textAlign: "center" }}>Allowed friends</h2>
          <div className="friend-list-table">
            <TableContainer className="add-modal-table-container" component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableBody>
                <TableRow>
                  <TableCell className='table-header-cell' 
                  style={{fontWeight:"bold", fontSize:"1.6em"}}
                  >Friends
                  </TableCell>
                </TableRow>
                  {friends.map((f) => (
                    <TableRow key = {f.webId}>
                      <TableCell
                        className="table-cell"
                        component="th"
                        scope="row"
                        style={{ fontSize: "1.2em" }}
                      >
                        {f.name}
                      </TableCell>
                      <TableCell
                        className="table-cell"
                        align="right"
                        height="20"
                      >
                        <Checkbox value={f.webId} onChange={handleCheck} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableBody>
                <TableRow>
                  <TableCell className='table-header-cell' 
                    style={{fontWeight:"bold", fontSize:"1.6em"}}
                    >Friend Groups
                  </TableCell>
                </TableRow>
                  {friendGroups.map((g) => (
                    <TableRow key = {g.name}>
                      <TableCell
                        className="table-cell"
                        component="th"
                        scope="row"
                        style={{ fontSize: "1.2em" }}
                      >
                        {g.name}
                      </TableCell>
                      <TableCell
                        className="table-cell"
                        align="right"
                        height="20"
                      >
                        <Checkbox value={g.members} onChange={handleCheck} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <div className="button-div">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "30%" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      {props.redirectToLogin ? <Navigate to="/login" /> : ""}
    </Modal>
  );
}
