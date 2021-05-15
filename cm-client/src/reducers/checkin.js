import { GET_CHECKINS, ADD_REACTION, GET_CHECKIN, CHECKIN_ERROR, CREATE_CHECKIN, DELETE_CHECKIN, ADD_COMMENT, DELETE_COMMENT } from '../actions/types'
// initiliazing checkin state
const initState = {
    checkins: [],
    checkin: null,
    loading: true,
    error: {}
}

/***************************************************************************************
*    Title: DevConnector
*    Author: Brad Traversy
*    Date: 2019
*    Code version: 2.0
*    Availability: https://github.com/bradtraversy/devconnector_2.0
*
***************************************************************************************/

export default function checkin(state = initState, action) {
    switch(action.type) {
        case GET_CHECKINS:
            return {
                ...state,
                checkins: action.payload,
                loading: false
            }
        case CREATE_CHECKIN:
            // adding the newly created checkin to the existing checkins array
            return {
                ...state,
                checkins: [action.payload, ...state.checkins],
                loading: false
            }
        case GET_CHECKIN:
            return {
                ...state,
                checkin: action.payload,
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
        case ADD_COMMENT:
            return {
                ...state,
                checkin: { ...state.checkin, comments: action.payload },
                loading: false
            }
        case DELETE_COMMENT:
            return {
                ...state,
                // filtering out the comment that matches the id
                checkin: { ...state.checkin, comments: state.checkin.comments.filter(comment => comment._id !== action.payload) },
                loading: false
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