import React from 'react';
import Rating from '@material-ui/lab/Rating';

import classes from './opinion.module.scss'

const Opinion = props => {

    return <div className={classes.opinion}>
        <p className={classes.email}>{props.email}</p>
        <Rating defaultValue={props.defaultValue} readOnly size="large" />
        <p className={classes.text}>{props.text}</p>
    </div>
}

export default Opinion