import * as actionTypes from "./../actions/actionTypes";
import fire from "./../firebaseConfig";

const initialState = {
  opinions: [],
};

const opinionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_OPINIONS:
      return {
        ...state,
        opinions: action.opinions,
      };
    case actionTypes.ADD_OPINION:
      let newOpinions = [...state.opinions];
      newOpinions.length >= 3 && newOpinions.pop();
      newOpinions.unshift(action.opinion);
      fire.database().ref(`opinions`).set(newOpinions);
      return {
        ...state,
        opinions: newOpinions,
      };
    default:
      return state;
  }
};

export default opinionReducer;
