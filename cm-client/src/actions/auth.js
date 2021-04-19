import axios from 'axios';
import { setAlert } from './alerts';
import { REGISTRATION_SUCCESS, REGISTRATION_FAILURE } from './types';

// REGISTER A USER
export const register = ({ name, email, password}) => async dispatch => {
    // headers config as data is being send
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // preparing the data to send in the request body
    const body = JSON.stringify({ name, email, password });

    try {
        // creating res from the axiso post request
        const res = await axios.post('/api/users', body, config);
        // dispatching registration success action with type and response data (token)
        dispatch({
            type: REGISTRATION_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        const errors = error.response.data.errors;
        // if there are errors dispatch the set alert action for each of the error message(s)
        // Req_Id:      R03 - Registration Validation
        // Test_Id:     T026
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        // dispatching the resgistration failure action
        dispatch({
            type: REGISTRATION_FAILURE
        })
    }
}