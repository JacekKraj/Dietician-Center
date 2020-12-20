import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import { NavLink } from "react-router-dom";

import classes from "./patient.module.scss";

const Patient = (props) => {
  const path = props.name.replace(/\s/g, "");
  return (
    <NavLink to={`/${path}`}>
      <div className={classes.container}>
        <p className={classes.name}>{props.name}</p>
        <ClearIcon className={classes.icon} />
      </div>
    </NavLink>
  );
};

export default Patient;
