import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'

import classes from './headerNav.module.scss';
import NavigationItem from './navigationItem/NavigationItem';
import Backdrop from './../UI/backdrop/Backdrop';
import * as actions from './../../actions/index'



const useStyles = makeStyles((theme) => ({
    icon: {
        color: "#333",
        [theme.breakpoints.up('xs')]: {
            width: 33, height: 33,
        },
        [`${theme.breakpoints.up('sm')} and (orientation: portrait)`]: {
            width: 55, height: 55
        }
    }
}))

const HeaderNav = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const [navBorder, setNavBorder] = useState(false)
    const materialUiStyles = useStyles();

    document.addEventListener("scroll", () => {
        if (window.pageYOffset > 30) {
            setNavBorder(true)
        } else {
            setNavBorder(false)
        }
    })


    const showMenuHandler = () => {
        setShowMenu(!showMenu)
    }

    const setLoginMode = () => {
        props.onChangeToLoginMode();
        setShowMenu(false)
    }

    return <div className={classnames(classes.headerNav, navBorder && classes.navBorder)} >
        {showMenu ? <Backdrop onClick={showMenuHandler} /> : null}
        <div className={classes.header}>
            <button className={classes.menuButton} onClick={showMenuHandler}><MenuIcon className={materialUiStyles.icon} /></button>
            <NavLink to="/"><p className={classes.logo}>DieticianCenter</p></NavLink>
        </div>
        <div className={classnames(classes.navHidden, showMenu && classes.navShown, classes.bigScreenNav)}>
            <div className={classes.navLeft}>
                <NavLink to="/"><p className={classes.logo}>DieticianCenter</p></NavLink>
                <NavigationItem text="FAQ" />
                <NavigationItem text="Contact" />
                <NavigationItem text="Patients" />
            </div>
            <div className={classes.navRight}>
                <button className={classes.authButton} onClick={setLoginMode} >Sign In</button>
            </div>
        </div>
    </div>
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeToLoginMode: () => dispatch(actions.setLoginMode())
    }
}

export default connect(null, mapDispatchToProps)(HeaderNav)