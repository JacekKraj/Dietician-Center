import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

import classes from "./navigationItem.module.scss";

const NavigationItem = (props) => {
  return (
    <NavLink to={`/${props.link}`} exact activeClassName={classes.active}>
      <button className={classnames(classes.navigationItem, props.className)} onClick={props.onClick}>
        {props.text ? props.text : props.link}
      </button>
    </NavLink>
  );
};

export default NavigationItem;
