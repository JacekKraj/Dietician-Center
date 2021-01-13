import React from "react";

import classes from "./modal.module.scss";

const Modal = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

export default Modal;
