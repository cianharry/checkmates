import axios from 'axios'
import { setAlert } from './alerts'
import { GET_CHAT, GET_ALL_CHATS, CHAT_ERROR } from './types'

// action to get all user chats
export const getChats = () => async dispatch => {
    try {
        // getting all chats from backend api
        const res = await axios.get('/api/chats')
        // dispatching the chats reducer action
        dispatch({
            type: GET_ALL_CHATS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CHAT_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// action to get an individual chat room
export const getChat = (chatId) => async dispatch => {
    try {
        // getting the individual chat from backend api
        const res = await axios.get(`/api/chat/${chatId}`)
        // dispatching the chat reducer action
        // ReqId:   
        // TestId:  T0
        dispatch({
            type: GET_CHAT,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CHAT_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}