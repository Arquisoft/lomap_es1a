import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';
import "./../../pages/Friends.css";
import type { Friend, Location } from "../../util/UserData";

interface Props {
    locations: Location[]
}

function UserLocationList<Props>( props:any ): JSX.Element {
  return (
    <TableContainer className="table-container" component={Paper} square variant="outlined">
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>Name</TableCell>
            <TableCell align="right" className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>Category</TableCell>
            <TableCell align="right" className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>Longitude</TableCell>
            <TableCell align="right" className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>Latitude</TableCell>
            <TableCell align="right" className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>Comments</TableCell>
            <TableCell align="right" className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>Score</TableCell>
            <TableCell align="right" className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.locations.map((l: Location) =>
              <TableRow>
                <TableCell className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>{l.name}</TableCell>
            <TableCell align="right" className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>{l.category}</TableCell>
            <TableCell align="right" className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>{l.longitud}</TableCell>
            <TableCell align="right" className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>{l.latitud}</TableCell>
            <TableCell align="right" className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>{l.comments}</TableCell>
            <TableCell align="right" className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>{l.score}</TableCell>
            <TableCell align="right" className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>{l.image}</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserLocationList