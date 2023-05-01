import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';
import "./../../pages/Friends.css";
import type { Location } from "../../util/UserData";


function UserLocationList( props:any ): JSX.Element {
  console.log("PROPS:")
  console.log(props.locations);
  return (
    <div className="main-container">
        <h1 className="title">Locations</h1>
        <div className="table-selector">
        <TableContainer className="table-container" component={Paper} square variant="outlined">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>Name</TableCell>
                <TableCell align="right" className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>Category</TableCell>
                <TableCell align="right" className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>Comments</TableCell>
                <TableCell align="right" className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                props.locations.map((l: Location) =>
                  <TableRow>
                    <TableCell className='table-header-cell' style={{fontSize:"1.5em"}}>{l.name}</TableCell>
                <TableCell align="right" className='table-header-cell' style={{fontSize:"1.5em"}}>{l.category}</TableCell>
                <TableCell align="right" className='table-header-cell' style={{fontSize:"1.5em"}}>{l.comments}</TableCell>
                <TableCell align="right" className='table-header-cell' style={{fontSize:"1.5em"}}>{l.score}</TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default UserLocationList