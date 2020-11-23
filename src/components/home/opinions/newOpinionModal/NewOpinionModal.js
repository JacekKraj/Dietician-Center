import React, { Fragment, useState } from 'react';
import { Formik, Form } from 'formik';
import Rating from '@material-ui/lab/Rating';
import { connect } from 'react-redux';

import classes from './newOpinionModal.module.scss';
import Backdrop from './../../../UI/backdrop/Backdrop';
import MyFormikTextArea from './../../../../utility/myFormikTextArea/MyFormikTextArea';
import Button from './../../../UI/button/Button';
import * as actions from './../../../../actions/index';
import TextArea from './../../../UI/textArea/TextArea';

const NewOpinionModal = (props) => {
    const [starsValue, setStarsValue] = useState(0);

    return (<Fragment>
        <Backdrop show={true} onClick={props.backdropClick} />
        <div className={classes.modal}>
            <Formik initialValues={{ opinion: '' }} onSubmit={(values) => {
                if (values.opinion) {
                    const newOpinion = {
                        opinion: values.opinion,
                        stars: starsValue,
                        email: props.fireUser.email
                    }
                    props.onAddOpinion(newOpinion)

                }
            }}>
                {() => {
                    return <Form>
                        <div className={classes.formContainer}>
                            <p>Add your opinion</p>
                            <Rating
                                onChange={(e, value) => {
                                    setStarsValue(value)
                                }}
                                name="page-rating"
                                size="large"
                            />
                            <MyFormikTextArea className={classes.textArea} name="opinion" as={TextArea} />
                            <Button type="submit" className={classes.button}>Submit opinion</Button>
                        </div>
                    </Form>
                }}
            </Formik>
        </div>
    </Fragment>)

}

const mapStateToProps = state => {
    return {
        fireUser: state.auth.fireUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddOpinion: (opinion) => dispatch(actions.addOpinion(opinion))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOpinionModal)