import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux'

import classes from './registerForm.module.scss';
import MyFormikInput from './../../../../utility/myFormikInput/MyFormikInput';
import Input from './../../../UI/input/Input';
import Button from './../../../UI/button/Button';
import * as actions from './../../../../actions/index'

const RegisterForm = (props) => {
    return <div className={classes.loginForm}>
        <Formik initialValues={{ email: "", password: "", repeatEmail: "", repeatPassword: "" }} onSubmit={() => { }} validationSchema={Yup.object({
            email: Yup.string().email(
                "Email you passed seems to be invalid."
            ),
            password: Yup.string()
                .min(4, "Password needs to be at least 4 characters.")
                .max(10, "Password needs to be at max 12 characters."),
        })}>
            {() => {
                return <Form>
                    <div className={classes.formContainer}>
                        <MyFormikInput name="email" type="email" as={Input} placeholder="email" />
                        <MyFormikInput name="repeatEmail" type="repeatEmail" as={Input} placeholder="repeat email" />
                        <MyFormikInput name="password" type="password" as={Input} placeholder="password" />
                        <MyFormikInput name="repeatPassword" type="password" as={Input} placeholder="repeat password" />
                        <Button type="submit" className={classes.button} >Sign Up</Button>
                        <p>Already have an accout? <span className={classes.registerLink} onClick={props.onChangeToLoginMode}>Sign in.</span></p>
                    </div>
                </Form>
            }}
        </Formik>
    </div>
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeToLoginMode: () => dispatch(actions.setLoginMode())
    }
}

export default connect(null, mapDispatchToProps)(RegisterForm)