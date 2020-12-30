import React, { useState, Fragment } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";

import classes from "./result.module.scss";
import LnChart from "../../../../../utility/charts/LnChart";

const Result = (props) => {
  const [showChart, setShowChart] = useState(false);

  const results = props.result.map((el) => {
    return (
      <div className={classes.result} key={`${el.date},${el.result}`}>
        <p className={classes.resultDate}>{el.date}:</p>
        <p className={classes.resultValue}>{el.result}</p>
      </div>
    );
  });

  return (
    <Fragment>
      {showChart ? (
        <LnChart
          data={props.result}
          backdropClick={() => {
            setShowChart(false);
          }}
          name={props.name}
        />
      ) : null}
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
                setShowChart(true);
              }}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.accordionDetails}>{results}</div>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
};

export default Result;
