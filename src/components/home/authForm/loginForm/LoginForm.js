import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import classes from "./loginForm.module.scss";
import MyFormikInput from "./../../../../utility/myFormikInput/MyFormikInput";
import Input from "./../../../UI/input/Input";
import Button from "./../../../UI/button/Button";
import * as actions from "./../../../../actions/index";
import { showFailToast } from "./../../../../utility/toastify/toastify";

const LoginForm = (props) => {
  return (
    <div className={classes.loginForm}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          if (values.email && values.password) {
            props.onLogin(values.email, values.password);
          } else {
            showFailToast("All inputs needs to be field.");
          }
        }}
        validationSchema={Yup.object({
          email: Yup.string().email("Email you passed seems to be invalid."),
          password: Yup.string().min(4, "Password needs to be at least 4 characters.").max(10, "Password needs to be at max 12 characters."),
        })}
      >
        {() => {
          return (
            <Form>
              <div className={classes.formContainer}>
                <MyFormikInput name="email" type="email" as={Input} placeholder="email" />
                <MyFormikInput name="password" type="password" as={Input} placeholder="password" />
                <Button type="submit" className={classes.button}>
                  Sign In
                </Button>
                <p>
                  Don't have account yet?{" "}
                  <span className={classes.registerLink} onClick={props.onChangeToRegisterMode}>
                    Sign up for free now.
                  </span>
                </p>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeToRegisterMode: () => dispatch(actions.setRegisterMode()),
    onLogin: (email, password) => dispatch(actions.login(email, password)),
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
