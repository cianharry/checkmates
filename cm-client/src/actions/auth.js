import axios from 'axios';
import { setAlert } from './alerts';
// importing the Auth token helper
import setAuthToken from '../helpers/setAuthToken';
// importing the action type constants 
import { REGISTRATION_SUCCESS, REGISTRATION_FAILURE, USER_PRESENT, AUTH_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

// CHECK USER AUTH STATUS
export const userPresent = () => async dispatch => {
    // if there is a token in local storage call set auth token helper to add it to global headers
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        // await the axios get request to the authentication api
        const res = await axios.get('/api/auth');
        // dispatching the user present action 
        dispatch({
            type: USER_PRESENT,
            payload: res.data
        });
    } catch (error) {
        // dispatching the auth failure action
        dispatch({
            type: AUTH_FAILURE
        })
    }
}


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
        // dispatching user present action on registration success 
        dispatch(userPresent());
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
};

// USER LOGIN
export const login = ( email, password ) => async dispatch => {
    // headers config as data is being sent
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // preparing the data to send in the request body
    const body = JSON.stringify({ email, password });

    try {
        // creating res from the axios post request
        const res = await axios.post('/api/auth', body, config);
        // dispatching registration success action with type and response data (token)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        // dispatching user present action on login success 
        dispatch(userPresent());
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
            type: LOGIN_FAILURE
        });
    }
}

