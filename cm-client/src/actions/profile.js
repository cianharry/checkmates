import axios from 'axios'
import { setAlert } from './alerts'

import { GET_USER_PROFILE, PROFILE_ERROR } from './types'

// action to get current user's profile
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

// action to create/update current user's profile
// history object provides push method which allows aredirect from inside an action
export const createUserProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // post request to profile backend api with fotm data and the config headers
        const res = await axios.post('/api/profile', formData, config)
        // dispatching the user profile reducer action 
        dispatch({
            type: GET_USER_PROFILE,
            payload: res.data
        })
        // dispatching the setAlert action to notify the user if the account has been updated or created
        dispatch(setAlert(edit ? 'Profile has been updated' : 'Profile has been created ', 'success'))
        // redirecting if creating a new profile
        if(!edit) {
            history.push('/dashboard')
        }
    } catch (error) {
        const errors = error.response.data.errors;
        // if there are errors dispatch the set alert action for each of the error message(s)
        // Req_Id:      R - Profile Validation
        // Test_Id:     T037
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}