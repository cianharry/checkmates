import axios from 'axios'
import { setAlert } from './alerts'
import { GET_CHECKINS, ADD_REACTION, CHECKIN_ERROR, DELETE_CHECKIN } from './types'

// action to get checkins
export const getCheckins = () => async dispatch => {
    try {
        // getting all checking from backend api
        const res = await axios.get('/api/checkins')
        // dispatching the checkins reducer action
        dispatch({
            type: GET_CHECKINS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CHECKIN_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// action to add support reaction to checkin
export const addReaction = checkinId => async dispatch => {
    try {
        // getting all checking from backend api
        const res = await axios.put(`/api/checkins/reaction/${checkinId}`)
        // dispatching the checkins reducer action
        dispatch({
            type: ADD_REACTION,
            payload: { checkinId, reactions: res.data}
        })
    } catch (error) {
        dispatch({
            type: CHECKIN_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// action to delete a user checkin
export const deleteCheckin = checkinId => async dispatch => {
    try {
        await axios.delete(`api/checkins/${checkinId}`)
        // dispatching the delete checkin reducer action
        dispatch({
            type: DELETE_CHECKIN,
            payload: checkinId
        })
        // notifying the user through the set alert action
        dispatch(setAlert('Checkin has been successfully deleted', 'success'))
    } catch (error) {
        dispatch({
            type: CHECKIN_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}