import * as actionTypes from './actionTypes';
import fire from './../firebaseConfig'

const setOpinions = opinions => {
    return {
        type: actionTypes.GET_OPINIONS,
        opinions: opinions
    }
}

export const getOpinions = () => {
    return dispatch => {
        fire.database().ref('opinions').once('value').then(snapshot => {
            dispatch(setOpinions(snapshot.val()))
        })
    }
}

export const addOpinion = (opinion) => {
    return {
        type: actionTypes.ADD_OPINION,
        opinion: opinion
    }
}