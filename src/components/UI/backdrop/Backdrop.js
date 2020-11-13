import React from 'react'

import classes from './backdrop.module.scss'

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClick}></div>
}

export default Backdrop