import React from 'react'

import classes from './textArea.module.scss'

const TextArea = props => {
    return <textarea maxLength="250" className={classes.textArea} placeholder="Max 250 characters" onChange={props.onChange} name={props.name} value={props.value} ></textarea>
}

export default TextArea;