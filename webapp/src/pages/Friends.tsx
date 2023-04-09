import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useSession } from "@inrupt/solid-ui-react";
import { Navigate } from "react-router-dom";
import { getFriends } from "../util/PodUtil";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';
import type { Friend } from "../util/UserData";

import "./Friends.css";

export default function Friends() {
  const { session } = useSession();
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    handleFriends();
  }, [friends]);

  const handleFriends = async () => {
    if (session.info.webId != undefined && session.info.webId != "") {
      let aux = await getFriends(session.info.webId).then((friendsPromise) => {
        return friendsPromise;
      });
      setFriends(aux);
    } else setFriends([]);
  };

  if (session.info.isLoggedIn) {
    return (
      <div className="main-container">
        <h1 className="title">Friends</h1>
        <TableContainer className="table-container" component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className='table-header-cell'>Name</TableCell>
                <TableCell align="right" className='table-header-cell'>Web ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                friends.map((f) =>
                  <TableRow>
                    <TableCell className='table-cell' component="th" scope="row">
                      {f.name}
                    </TableCell>
                    <TableCell className='table-cell' align="right">{f.webId}</TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  } else return <Navigate to="/login" />;
}
