import * as actionTypes from './../actions/actionTypes'

const initialState = {
    opinions: []
}

const opinionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_OPINIONS:
            return {
                ...state,
                opinions: action.opinions
            }
        case actionTypes.ADD_OPINION:
            let newOpinions = [...state.opinions];
            newOpinions.length >= 3 && newOpinions.pop();
            newOpinions.unshift(action.opinion)
            return {
                ...state,
                opinons: newOpinions
            }
        default:
            return state
    }
}

export default opinionReducer