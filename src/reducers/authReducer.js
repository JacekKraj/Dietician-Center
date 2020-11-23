import { FastRewind } from '@material-ui/icons'
import * as actionTypes from './../actions/actionTypes'

import { showFailToast } from './../utility/toastify/toastify'

const initialState = {
    loginMode: false,
    registerMode: false,
    authenticated: false,
    loading: false,
    fireUser: null,
    error: null
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
        case actionTypes.REGISTER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.REGISTER_END:
            return {
                ...state,
                loading: false
            }
        case actionTypes.REGISTER_FAIL:
            showFailToast(action.error.message)
            return {
                ...state,
                loading: false,
            }
        case actionTypes.LOGIN_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.LOGIN_END:
            return {
                ...state,
                loading: false,
            }
        case actionTypes.LOGIN_FAIL:
            showFailToast(action.error.message)
            return {
                ...state,
                loading: false,
                authenticated: false,
            }
        case actionTypes.AUTO_LOGIN:
            return {
                ...state,
                fireUser: action.fireUser,
                authenticated: true
            }
        case actionTypes.AUTO_LOGOUT:
            return {
                ...state,
                fireUser: null,
                authenticated: false
            }
        default:
            return state
    }
}

export default authReducer