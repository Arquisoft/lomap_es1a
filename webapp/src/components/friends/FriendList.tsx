import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';
import "./../../pages/Friends.css";
import type { Friend } from "../../util/UserData";

interface Props {
    friends: Friend[]
}

function FriendList<Props>( props:any ): JSX.Element {
  return (
    <TableContainer className="table-container" component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>Name</TableCell>
            <TableCell align="right" className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>Web ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.friends.map((f: Friend) =>
              <TableRow>
                <TableCell className='table-cell' component="th" scope="row" style={{fontSize:"1.5em"}}>
                  {f.name}
                </TableCell>
                <TableCell className='table-cell' align="right" style={{fontSize:"1.5em"}}>{f.webId}</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FriendList