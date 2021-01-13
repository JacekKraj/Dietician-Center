import * as actionTypes from "./actionTypes";

import fire from "./../firebaseConfig";
import { fireAuth } from "./../firebaseConfig";

const getNames = (names) => {
  return {
    type: actionTypes.GET_PATIENTS_NAMES,
    patientsNames: names,
  };
};

export const getPatientsNames = () => {
  return (dispatch) => {
    fire
      .database()
      .ref(`${fire.auth().currentUser?.uid}/patientsNames`)
      .once("value")
      .then((snapshot) => {
        dispatch(getNames(snapshot.val()));
      });
  };
};

export const setPatientsNames = (names) => {
  return {
    type: actionTypes.SET_PATIENTS_NAMES,
    names: names,
  };
};

export const removePatientName = (name) => {
  return {
    type: actionTypes.REMOVE_PATIENT_NAME,
    name: name,
  };
};
