import React from "react";
import { makeStyles } from "@material-ui/core";

import classes from "./contact.module.scss";
import EmailIcon from "@material-ui/icons/Email";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#FF7F50",
    [theme.breakpoints.up("xs")]: {
      width: 30,
      height: 30,
    },
    [theme.breakpoints.up("sm")]: {
      width: 50,
      height: 50,
    },
  },
}));

const Contact = () => {
  const iconStyles = useStyles();
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Do you need some help or you aren't sure about something on our page? Contact us and dispel your doubts.</h1>
      <div className={classes.emailContainer}>
        <EmailIcon className={iconStyles.icon} />
        <p>dieticiancenter@gmail.com</p>
      </div>
      <p>We will be here to help and answer your questions.</p>
    </div>
  );
};

export default Contact;
