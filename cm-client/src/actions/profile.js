import axios from 'axios'
import { setAlert } from './alerts'

import { GET_USER_PROFILE, UPDATE_USER_PROFILE, CLEAR_USER_PROFILE, PROFILE_ERROR, DELETE_USER } from './types'

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

// Add Milestone to Profile
export const addMilestone = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // put request to profile backend api with form data and the config headers
        const res = await axios.put('/api/profile/milestone', formData, config)
        // dispatching the user profile reducer action 
        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: res.data
        })
        // dispatching the setAlert action to notify the user that the milestone is added
        // Req_Id:      R - Milestone Validation
        // Test_Id:     T040
        dispatch(setAlert('Milestone added to User Profile ', 'success'))
        // redirecting when the milestone is added 
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors;
        // if there are errors dispatch the set alert action for each of the error message(s)
        // Req_Id:      R - Milestone Validation
        // Test_Id:     T041
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

// Delete Milestone from Profile
export const deleteMilestone = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/milestone/${id}`)

        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: res.data
        })
        // dispatching the setAlert action to notify the user that the milestone is added
        // Req_Id:      R - Milestone deletion
        // Test_Id:     T043
        dispatch(setAlert('Milestone succesfully removed from User Profile ', 'success'))

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

// Delete User account and dependent profile
export const deleteUser = () => async dispatch => {
    if(window.confirm('Are you certain, this action cannot be reversed')) {
        try {
            const res = await axios.delete('/api/profile')
            
            dispatch({ type: CLEAR_USER_PROFILE })
            dispatch({ type: DELETE_USER })
            // dispatching the setAlert action to notify the user that their account is deleted
            // Req_Id:      R - Account deletion
            // Test_Id:     T044
            dispatch(setAlert('Checkmates account has been deleted', 'danger'))
    
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusText, status: error.response.status}
            })
        }
    }
}
