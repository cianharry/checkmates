// reducer that handles authentication based off application state changes
import  { REGISTRATION_SUCCESS, REGISTRATION_FAILURE, USER_PRESENT, AUTH_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, DELETE_USER } from '../actions/types';
// initialising auth state
const initState = {
    // attempting to fetch token that exists in local storage
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function auth(state = initState, action) {
    switch(action.type) {
        case USER_PRESENT:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case REGISTRATION_SUCCESS:
        case LOGIN_SUCCESS:
            // adding the token to local storage
            localStorage.setItem('token', action.payload.token);
            // returning successful auth state
            return {
                // using a spread operator as state is immutable
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTRATION_FAILURE:
        case AUTH_FAILURE:
        case LOGIN_FAILURE:
        case LOGOUT:
        case DELETE_USER:
            // removing the invalid token from local storage
            localStorage.removeItem('token');
            // returning failed auth state
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }

        default:
            return state;
    }
}