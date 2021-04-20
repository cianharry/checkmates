import axios from 'axios'
import { setAlert } from './alerts'

import { GET_USER_PROFILE, PROFILE_ERROR } from './types'

// get current users profile
export const getCurrentUser = () => async dispatch => {
    try {
        // setting response to the get request to profile api
        const res = await axios.get('/api/profile/me');
        // dispatching the user profile reducer action
        dispatch({
            type: GET_USER_PROFILE,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}