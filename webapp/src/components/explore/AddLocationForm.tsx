import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import styles from './addlocationform.module.css';


export default function AddLocationForm(): JSX.Element {
  const [category, setCategory] = React.useState("");

  const handleChange = () => {};

  const handleSubmit = (evt: any) => {
  }

  return (
    <div className={styles.mainContainer}>
      <TextField fullWidth id="name-field" label="Name" />
      <FormControl>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Category"
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value={"shop"}>Shop</MenuItem>
          <MenuItem value={"restaurant"}>Restaurant</MenuItem>
          <MenuItem value={"monument"}>Monument</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        id="comments-field"
        label="Comments"
        multiline
        maxRows={4}
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </div>
  );
}
