import React, { useState } from 'react';

import { navData } from "./navData";
import styles from './sidenav.module.css';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { NavLink } from "react-router-dom";

export default function Sidenav(): JSX.Element {

    const [open, setopen] = useState(true)

    const toggleOpen = () => {
        setopen(!open)
    }

    return (
      <div style={{width:"0", height:"0"}}>
      <div className={open ? styles.sidenav : styles.sidenavClosed}>
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
      <div className={open ? styles.sidenavbox : styles.sidenavboxClosed}/>
      </div>
    );
}