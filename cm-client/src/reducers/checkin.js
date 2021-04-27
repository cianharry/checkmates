import { GET_CHECKINS, ADD_REACTION, CHECKIN_ERROR, DELETE_CHECKIN } from '../actions/types'
// initiliazing checkin state
const initState = {
    checkins: [],
    checkin: null,
    loading: true,
    error: {}
}

export default function checkin(state = initState, action) {
    switch(action.type) {
        case GET_CHECKINS:
            return {
                ...state,
                checkins: action.payload,
                loading: false
            }
        case DELETE_CHECKIN:
            return {
                ...state,
                // returning all the checkin except for the one that has been deleted
                checkins: state.checkins.filter(checkin => checkin._id !== action.payload),
                loading: false
            }
        case CHECKIN_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
                checkin: null
            }
        case ADD_REACTION:
            return {
                ...state,
                // mapping through the checkins to see if it matches the payload id, return the state with reactions
                checkins: state.checkins.map(checkin => checkin._id === action.payload.checkinId ? {
                    ...checkin, reactions: action.payload.reactions
                } : checkin),
                loading: false
            }
        default:
            return state
    }
}