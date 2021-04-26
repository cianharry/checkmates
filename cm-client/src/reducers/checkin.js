import { GET_CHECKINS, CHECKIN_ERROR } from '../actions/types'
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
        case CHECKIN_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
                checkin: null
            }
        default:
            return state
    }
}