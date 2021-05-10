// reducer that handles alerts based off application state changes
import { SET_ALERT, REMOVE_ALERT } from '../actions/types'
const initState = [
];

// function that updates the state based on the action type 
export default function alerts(state = initState, action) {
    switch(action.type) {
        // adds the alert action payload to the state array
        case SET_ALERT:
            return [...state, action.payload];
        // removes the alert action payload from the state array
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload);
        default:
            return state;
    }
}