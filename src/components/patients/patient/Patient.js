import React, { useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

import classes from "./patient.module.scss";
import ImagesSection from "./imagesSection/ImagesSection";
import ResultsSection from "./resultsSection/ResultsSection";

const Patient = (props) => {
  const [resultsMode, setResultsMode] = useState(0);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <NavLink to="/patients">
          <ArrowBackIcon />
        </NavLink>
        <p>{props.name}</p>
      </div>
      <div className={classes.mainContent}>
        <div className={classes.nav}>
          <div
            className={classnames(!resultsMode && classes.navResultsButtonActive, resultsMode && classes.navResultsButtonInactive)}
            onClick={() => {
              setResultsMode(0);
            }}
          >
            results
          </div>
          <div
            className={classnames(!resultsMode && classes.navScansButtonInactive, resultsMode && classes.navScansButtonActive)}
            onClick={() => {
              setResultsMode(1);
            }}
          >
            scans
          </div>
        </div>
        <div className={classnames(classes.results, !resultsMode && classes.results1, resultsMode && classes.results2)}>
          {resultsMode ? <ImagesSection name={props.name} /> : <ResultsSection name={props.name} />}
        </div>
      </div>
    </div>
  );
};

export default Patient;
