import axios from 'axios'
import { setAlert } from './alerts'
import { GET_CHECKINS, CHECKIN_ERROR } from './types'

// actions to get checkins
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