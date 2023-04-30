
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Location } from "../util/UserData"


interface Props {
    locations: Location[]
}

function LocationList<Props>( props:any ): JSX.Element {
    return (
      <TableContainer className="table-container" component={Paper} square variant="outlined">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>Name</TableCell>
              <TableCell align="right" className='table-header-cell' style={{fontWeight:"bold", fontSize:"1.5em"}}>Web ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.friends.map((f: Location) =>
                <TableRow>
                  <TableCell className='table-cell' component="th" scope="row" style={{fontSize:"1.5em"}}>
                    {f.name}
                  </TableCell>
                  <TableCell className='table-cell' align="right" style={{fontSize:"1.5em"}}>{f.category}</TableCell>
                  <TableCell className='table-cell' align="right" style={{fontSize:"1.5em"}}>{f.longitud}</TableCell>
                  <TableCell className='table-cell' align="right" style={{fontSize:"1.5em"}}>{f.latitud}</TableCell>
                  <TableCell className='table-cell' align="right" style={{fontSize:"1.5em"}}>{f.score}</TableCell>
                  <TableCell className='table-cell' align="right" style={{fontSize:"1.5em"}}>{f.image}</TableCell>
                  <TableCell className='table-cell' align="right" style={{fontSize:"1.5em"}}>{f.comments}</TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  
  export default LocationList