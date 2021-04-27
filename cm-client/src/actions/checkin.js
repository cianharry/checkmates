import axios from 'axios'
import { setAlert } from './alerts'
import { GET_CHECKINS, ADD_REACTION, GET_CHECKIN, CHECKIN_ERROR, CREATE_CHECKIN, DELETE_CHECKIN } from './types'

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

// action to create a user checkin
export const createCheckin = (formData) => async dispatch => {
    // config of headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        // ReqId:   
        // TestId:  T051
        const res = await axios.post('api/checkins/', formData, config)
        // dispatching the create checkin reducer action
        // ReqId:   
        // TestId:  T051
        dispatch({
            type: CREATE_CHECKIN,
            payload: res.data
        })
        // notifying the user through the set alert action
        dispatch(setAlert('Checkin has been created, keep it up!', 'success'))
    } catch (error) {
        dispatch({
            type: CHECKIN_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// action to get an individual user checkin
export const getCheckin = (checkinId) => async dispatch => {
    try {
        // getting the individual checkin from backend api
        const res = await axios.get(`/api/checkins/${checkinId}`)
        // dispatching the checkin reducer action
        // ReqId:   
        // TestId:  T052
        dispatch({
            type: GET_CHECKIN,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CHECKIN_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}