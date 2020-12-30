import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./noPatientData.module.scss";
import Button from "../../../UI/button/Button";
import Spinner from "./../../../UI/spinner/Spinner";

const NoPatientData = (props) => {
  return (
    <div className={classes.spinnerContainer}>
      {!props.touched ? (
        <Spinner />
      ) : (
        <div className={classes.noDataInfo}>
          <p>Seems like this patient doesn't have any data yet.</p>
          <NavLink to="/add-new-result">
            <Button className={classes.button}>Add data</Button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default NoPatientData;
