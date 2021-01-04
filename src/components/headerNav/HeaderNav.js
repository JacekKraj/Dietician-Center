import React, { useState, Fragment } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import classes from "./headerNav.module.scss";
import NavigationItem from "./navigationItem/NavigationItem";
import Backdrop from "./../UI/backdrop/Backdrop";
import * as actions from "./../../actions/index";
import fire from "./../../firebaseConfig";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#333",
    [theme.breakpoints.up("xs")]: {
      width: 33,
      height: 33,
    },
    [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
      width: 55,
      height: 55,
    },
  },
}));

const HeaderNav = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [navBorder, setNavBorder] = useState(false);
  const materialUiStyles = useStyles();

  document.addEventListener("scroll", () => {
    if (window.pageYOffset > 30) {
      setNavBorder(true);
    } else {
      setNavBorder(false);
    }
  });

  const showMenuHandler = () => {
    setShowMenu(!showMenu);
  };

  const setLoginModeHandler = () => {
    props.onChangeToLoginMode();
    setShowMenu(false);
  };

  const logOutHandler = () => {
    fire.auth().signOut();
  };

  return (
    <div className={classnames(classes.headerNav, navBorder && classes.navBorder)}>
      {showMenu ? <Backdrop onClick={showMenuHandler} /> : null}
      <div className={classes.header}>
        <button className={classes.menuButton} onClick={showMenuHandler}>
          <MenuIcon className={materialUiStyles.icon} />
        </button>
        <NavLink to="/">
          <p className={classes.logo}>DieticianCenter</p>
        </NavLink>
      </div>
      <div className={classnames(classes.navHidden, showMenu && classes.navShown, classes.bigScreenNav)}>
        <div className={classes.navLeft}>
          <NavLink to="/">
            <p className={classes.logo}>DieticianCenter</p>
          </NavLink>
          <NavigationItem link="faq" />
          <NavigationItem link="contact" />
          {props.isAuthenticated && (
            <Fragment>
              <NavigationItem link="patients" /> <NavigationItem text="add result" link="add-new-result" />
            </Fragment>
          )}
        </div>
        <div className={classes.navRight}>
          {!props.isAuthenticated ? (
            <button className={classes.authButton} onClick={setLoginModeHandler}>
              Sign In
            </button>
          ) : (
            <button className={classes.authButton} onClick={logOutHandler}>
              Log out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeToLoginMode: () => dispatch(actions.setLoginMode()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);
