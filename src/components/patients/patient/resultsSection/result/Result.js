import React from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";

import classes from "./result.module.scss";

const Result = (props) => {
  const results = props.result.map((el) => {
    return (
      <div className={classes.result} key={`${el.date},${el.result}`}>
        <p className={classes.resultDate}>{el.date}:</p>
        <p className={classes.resultValue}>{el.result}</p>
      </div>
    );
  });

  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary
        expandIcon={<KeyboardArrowDownIcon />}
        className={classes.accordionSummary}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={classes.resultsHeader}>
          <p className={classes.resultsName}>{props.name}</p>
          <EqualizerIcon
            onClick={(e) => {
              e.preventDefault();
              console.log(e);
            }}
          />
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className={classes.accordionDetails}>{results}</div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Result;
