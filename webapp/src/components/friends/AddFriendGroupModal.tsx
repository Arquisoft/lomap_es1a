import Modal from "react-modal";
import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import Checkbox from "@mui/material/Checkbox";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { getAllGroupsObject, saveLocation, saveGroup, getFriends } from "../..//util/PodUtil";
import type { Friend, Group } from "../../util/UserData";

import './AddFriendGroupModal.css';

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
  closeModal: () => void;
  openModal: () => void;
  showNotification: () => void;
}

export default function AddFriendGroup<Props>(props: any): JSX.Element {
  const { session } = useSession();
  
  const [friends, setFriends] = useState<Friend[]>([]);
  const [name, setName] = useState("");
  const [checked, setChecked] = useState<any[]>([]);
  const [checkedAsFriend, setCheckedAsFriend] = useState<Friend[]>([]);

  const handleCheck = (event:any) => {
    var updatedList:any = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);

    let newCheckedAsFriend:Friend[] = [];
    for (let i = 0; i < checked.length; i++) {
      newCheckedAsFriend.push({
        name: "",
        webId: checked[i]
      })
    }
    setCheckedAsFriend(newCheckedAsFriend);
    console.log("CHECK LIST:")
    console.log(checkedAsFriend);
    console.log("NAME:");
    console.log(name);
  };

  useEffect(() => {
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
 
  const handleNameChange = async (e:any) => {
    setName(e.target.value);
  }

  const handleSubmit = async () => {
    await saveGroup(session, {
        name: name,
        webId: session.info.webId,
        members: checkedAsFriend
    }).then(() => {
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
      <div className="friend-group-modal-title">
        <h1>Create Friend Group</h1>
      </div>
      <div className="friend-group-name-field">
        <TextField
            fullWidth
            id="name-field"
            label="Name"
            value={name}
            onChange={handleNameChange}
          />
      </div>
      <div className="friend-group-modal-table-container">
        <TableContainer className="table-container" component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {friends.map((f) => (
                <TableRow>
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
          </Table>
        </TableContainer>
      </div>
      <div className="friend-group-modal-button-div">
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
    </Modal>
  );
}
