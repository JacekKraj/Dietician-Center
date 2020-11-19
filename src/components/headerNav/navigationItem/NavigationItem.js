import React from 'react'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'

import classes from './navigationItem.module.scss'

const NavigationItem = props => {
    return <NavLink to={`/${props.text}`} exact activeClassName={classes.active}>
        <button className={classnames(classes.navigationItem, props.className)} onClick={props.onClick}>{props.text}</button>
    </NavLink>
}

export default NavigationItem