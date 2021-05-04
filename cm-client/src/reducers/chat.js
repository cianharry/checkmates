import { GET_CHAT, GET_ALL_CHATS, CREATE_CHAT, CHAT_ERROR } from '../actions/types'
// initiliazing checkin state
const initState = {
    chats: [],
    chat: null,
    loading: true,
    error: {}
}

export default function chat(state = initState, action) {
    switch(action.type) {
        case GET_ALL_CHATS:
            return {
                ...state,
                chats: action.payload,
                loading: false
            }
        case GET_CHAT:
            return {
                ...state,
                chat: action.payload,
                loading: false
            }
        case CREATE_CHAT:
            // adding the newly created chat to the existing chats array
            return {
                ...state,
                chats: [action.payload, ...state.chats],
                loading: false
            }
        case CHAT_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
                chat: null
            }
        default:
            return state
    }
}