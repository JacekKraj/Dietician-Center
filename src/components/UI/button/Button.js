import React from "react";
import classnames from "classnames";

import classes from "./button.module.scss";

const Button = (props) => {
  return (
    <button type={props.type} disabled={props.disabled} className={classnames(classes.button, props.className)} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
