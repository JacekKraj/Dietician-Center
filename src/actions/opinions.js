import * as actionTypes from './actionTypes'

export const getOpinions = () => {
    return {
        type: actionTypes.GET_OPINIONS,
        opinions: opinions
    }
}

export const addOpinion = (opinion) => {
    return {
        type: actionTypes.ADD_OPINION,
        opinion: opinion
    }
}