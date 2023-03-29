import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import styles from './sideform.module.css';

export default function Filter(): JSX.Element {
  const [category, setCategory] = React.useState("");

  const handleChange = () => {};

  return (
    <div>
      <div className={styles.sideForm}>
        <button className={styles.menuBtn}>
        </button>
        <p>Form contents</p>
      </div>
    </div>
  );
}
