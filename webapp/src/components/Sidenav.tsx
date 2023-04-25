import React, { useState } from 'react';

import { navData } from "./navData";
import styles from './sidenav.module.css';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function Sidenav(): JSX.Element {

    const [open, setopen] = useState(false)

    const theme = useTheme();

    const toggleOpen = () => {
        setopen(!open)
    }

    return (
      <div className={open ? styles.sidenav : styles.sidenavClosed} style={{backgroundColor:theme.palette.primary.main}}>
        <button className={styles.menuBtn} onClick={toggleOpen}>
          {open ? (
            <KeyboardDoubleArrowLeftIcon />
          ) : (
            <KeyboardDoubleArrowRightIcon />
          )}
        </button>
        {navData.map((item) => {
            return (
                <NavLink key={item.id} className={styles.sideitem} to={item.link}>
                    {item.icon}
                    <span className={open ? styles.linkText : styles.linkTextClosed}>
                        {item.text}
                    </span>
                </NavLink>
            );
        })}
      </div>
    );
}