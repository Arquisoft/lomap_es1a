import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import styles from './filter.module.css';

export default function Filter(): JSX.Element {
  const [category, setCategory] = React.useState("");

  const handleChange = () => {};

  return (
    <Box className={styles.boxContainer}>
      <FormControlLabel
          label="Friend locations"
          control={<Switch disabled />} // TODO: Friends locations debe activarse cuando el usuario esté logueado
          className={styles.friendsFilter}
        />
      <FormControl className={styles.form}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Category"
          onChange={handleChange}
          className={styles.categoryFilter}
        >
          <MenuItem value={"shop"}>Shop</MenuItem>
          <MenuItem value={"restaurant"}>Restaurant</MenuItem>
          <MenuItem value={"monument"}>Monument</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
