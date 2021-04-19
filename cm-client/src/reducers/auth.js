// reducer that handles authentication based off application state changes
import  { REGISTRATION_SUCCESS, REGISTRATION_FAILURE } from '../actions/types';
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
        case REGISTRATION_SUCCESS:
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
            // removing te token from local storage
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