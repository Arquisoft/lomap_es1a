import { useState, useEffect } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import CloseIcon from '@mui/icons-material/Close';
import {
  getAllGroupsObject,deleteGroup
} from "../..//util/PodUtil";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import "./../../pages/Friends.css";

import type { Friend, Group } from "../../util/UserData";

interface Props {
  modalIsOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  showNotification: () => void;
}

function FriendGroupList<Props>(props: any): JSX.Element {
  const { session } = useSession();

  const [openRow, setOpenRow] = useState<boolean[]>([]);

  const [friendGroups, setFriendGroups] = useState<Group[]>([]);

  useEffect(() => {
    setFriendGroups([]);
    if (!session || !session.info.isLoggedIn) return;
    (async () => {
      setFriendGroups(await getAllGroupsObject(session));

      console.log("CURRENT FRIEND GROUPS:");
      console.log(friendGroups);
      console.log(openRow);
    })();
  }, [session, session.info.webId]);

  return (
    <div>
      <List
        component={Paper}
        variant="outlined"
        square
        style={{ marginTop: "1em", maxHeight: "55vh", height: "55vh" }}
      >
        {friendGroups.map((friendGroup, index) => {
          let name = friendGroup.name;
          let members = friendGroup.members;

          return (
            <div>
              <div style={{display:"flex", alignItems:"center"}}>
                <ListItemButton>
                  <ListItemText
                    disableTypography
                    primary={name}
                    onClick={() => {
                      let currentBools = [...openRow];
                      currentBools[index] = !currentBools[index];
                      setOpenRow(currentBools);
                    }}
                    style={{ fontWeight: "bold", fontSize: "1.5em" }}
                  />
                  {openRow[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ height: "50%" }} style={{marginRight:"1%"}}
                  onClick={() => {
                    deleteGroup(session, friendGroup)
                  }}
                >
                  <CloseIcon/>
                </Button>
              </div>
              <Collapse in={openRow[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {members.map((member) => {
                    return (
                      <ListItem sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <AccessibilityNewIcon />
                        </ListItemIcon>
                        <ListItemText
                          disableTypography
                          primary={member.name}
                          style={{ fontWeight: "bold", fontSize: "1.2em" }}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </div>
          );
        })}
      </List>
      <div className="add-friend-group-button">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "30%" }}
          onClick={props.openModal}
        >
          Create Friend Group
        </Button>
      </div>
    </div>
  );
}

export default FriendGroupList;
