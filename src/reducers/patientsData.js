import * as actionTypes from "./../actions/actionTypes";
import fire from "./../firebaseConfig";

const initialState = {
  patientsNames: [],
  patientsNamesGot: false,
};

const patientsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PATIENTS_NAMES:
      const patientsNames = action.patientsNames ? [...action.patientsNames] : [];
      return {
        ...state,
        patientsNamesGot: true,
        patientsNames: patientsNames,
      };
    case actionTypes.SET_PATIENTS_NAMES:
      const newPatientsNames = [...state.patientsNames, ...action.names];
      fire
        .database()
        .ref(`${fire.auth().currentUser.uid}/patientsNames`)
        .set(newPatientsNames)
        .then(() => {})
        .catch(() => {});
      return {
        ...state,
        patientsNames: newPatientsNames,
      };
    case actionTypes.REMOVE_PATIENT_NAME:
      const removedNameIndex = state.patientsNames.findIndex((el) => {
        return el === action.name;
      });
      const newNames = [...state.patientsNames];
      newNames.splice(removedNameIndex, 1);
      fire
        .database()
        .ref(`${fire.auth().currentUser.uid}/patientsNames`)
        .set(newNames)
        .then(() => {})
        .catch(() => {});
      return {
        ...state,
        patientsNames: newNames,
      };
    default:
      return state;
  }
};

export default patientsDataReducer;
