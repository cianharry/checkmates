// reducer that handles alerts based off application state changes
import { SET_ALERT, REMOVE_ALERT } from '../actions/types'
const initState = [
];

export default function(state = initState, action) {
    switch(action.type) {
        case SET_ALERT:
            return [...state, action.payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id != action.payload);
        default:
            return state;
    }
}