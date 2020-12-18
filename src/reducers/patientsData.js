import * as actionTypes from "./../actions/actionTypes";
import fire from "./../firebaseConfig";

const initialState = {
  patientsNames: [],
};

const patientsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PATIENTS_NAMES:
      const patientsNames = action.patientsNames ? [...action.patientsNames] : [];
      return {
        ...state,
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
    default:
      return state;
  }
};

export default patientsDataReducer;
