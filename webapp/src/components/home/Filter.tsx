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
  reloadMap: (category:string) => void;
}

export default function Filter<Props>( props:any ): JSX.Element {
  const [category, setCategory] = React.useState("Show all");

  const handleChange = (event:any) => {
    
    let category = (event.target.value as string);
    props.reloadMap(category);
    setCategory(category);
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
          <MenuItem value={""}>Show all</MenuItem>
          <MenuItem value={"shops"}>Shop</MenuItem>
          <MenuItem value={"restaurants"}>Restaurant</MenuItem>
          <MenuItem value={"monuments"}>Monument</MenuItem>
          <MenuItem value={"others"}>Other</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
