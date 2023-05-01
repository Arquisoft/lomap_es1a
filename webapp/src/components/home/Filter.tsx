import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import styles from './filter.module.css';

export default function Filter( props:any ): JSX.Element {
  const [category, setCategory] = React.useState("Show all");

  const handleChangeCategory = (event:any) => {
    
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
            value={false}
            onChange={props.handleFilterFriends}
            />
          ) : (
            <FormControlLabel
            label="Friend locations"
            control={<Switch />}
            className={styles.friendsFilter}
            value={true}
            onChange={props.handleFilterFriends}
            />
          )}
      <FormControl className={styles.form}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Category"
          onChange={handleChangeCategory}
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
