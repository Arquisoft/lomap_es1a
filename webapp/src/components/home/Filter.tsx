import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import styles from './filter.module.css';

interface Props {
  toggleFriends: boolean
}

export default function Filter<Props>( props:any ): JSX.Element {
  const [category, setCategory] = React.useState("Show all");

  const handleChange = (event: any) => {
    setCategory(event.target.value as string);
  };

  return (
    <div className={styles.boxContainer}>
      {props.toggleFriends ? (
            <FormControlLabel
            label="Friend locations"
            control={<Switch />} 
            className={styles.friendsFilter}
            />
          ) : (
            <FormControlLabel
            label="Friend locations"
            control={<Switch disabled />}
            className={styles.friendsFilter}
            />
          )}
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
          <MenuItem value={"all"}>Show all</MenuItem>
          <MenuItem value={"shop"}>Shop</MenuItem>
          <MenuItem value={"restaurant"}>Restaurant</MenuItem>
          <MenuItem value={"monument"}>Monument</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
