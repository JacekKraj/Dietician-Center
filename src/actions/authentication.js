import * as actionTypes from "./actionTypes";
import fire from "./../firebaseConfig";
import firebase from "firebase";

export const setLoginMode = () => {
  return {
    type: actionTypes.SET_LOGIN_MODE,
  };
};

export const setRegisterMode = () => {
  return {
    type: actionTypes.SET_REIGSTER_MODE,
  };
};

const registerStart = () => {
  return {
    type: actionTypes.REGISTER_START,
  };
};

const registerEnd = () => {
  return {
    type: actionTypes.REGISTER_END,
  };
};
const registerFail = (error) => {
  return {
    type: actionTypes.REGISTER_FAIL,
    error: error,
  };
};

const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const loginEnd = () => {
  return {
    type: actionTypes.LOGIN_END,
  };
};
const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error,
  };
};

export const register = (email, password) => {
  return (dispatch) => {
    dispatch(registerStart());
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(registerEnd());
        dispatch(setLoginMode());
        firebase.auth().currentUser.sendEmailVerification();
      })
      .catch((error) => {
        dispatch(registerFail(error));
      });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(loginStart());
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(loginEnd());
      })
      .catch((error) => {
        dispatch(loginFail(error));
      });
  };
};

export const autoLogin = (fireUser) => {
  return {
    type: actionTypes.AUTO_LOGIN,
    fireUser: fireUser,
  };
};

export const autoLogout = () => {
  fire.auth().signOut();
  return {
    type: actionTypes.AUTO_LOGOUT,
  };
};
