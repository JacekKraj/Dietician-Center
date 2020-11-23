import React from 'react';
import { connect } from 'react-redux'

import classes from './opinions.module.scss';
import Opinion from './opinion/Opinion'

const Opinions = (props) => {
    return <div className={classes.opinions}>
        {props.authenticated && props.opinions?.map((el, index) => {
            return <Opinion key={index} email={el.email} text={el.opinion} defaultValue={el.stars} />
        })}
    </div>
}


const mapStateToProps = state => {
    return {
        opinions: state.opinion.opinions,
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(Opinions)