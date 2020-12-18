import React from "react";

import classes from "./dateInput.module.scss";

const DateInput = (props) => {
  return (
    <input
      type="date"
      name="date"
      value={props.value}
      min="2000-01-01"
      max="2030-12-31"
      className={classes.input}
      required
      onChange={props.onChange}
    />
  );
};

export default DateInput;
