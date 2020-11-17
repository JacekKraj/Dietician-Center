import * as actionTypes from './../actions/actionTypes'

const initialState = {
    loginMode: false,
    registerMode: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOGIN_MODE:
            return {
                ...state,
                loginMode: true,
                registerMode: false
            }
        case actionTypes.SET_REIGSTER_MODE:
            return {
                ...state,
                registerMode: true,
                loginMode: false
            }
        default:
            return state
    }
}

export default authReducer