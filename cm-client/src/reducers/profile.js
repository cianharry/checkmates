import { GET_USER_PROFILE, PROFILE_ERROR, CLEAR_USER_PROFILE } from '../actions/types';

// initiliazing profile state
const initState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}

export default function profile(state = initState, action) {
    switch(action.type) {
        case GET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_USER_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            }
        default:
            return state;
    }
}