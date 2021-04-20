// package that provides universal id functionality
import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// set alert action dispatches the type SET_ALERT to the reducer which adds the alert to the application state
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    // generating a universal id
    const id = uuid();
    // dispatching set alert with the message, type and id
    // Req_Id:      R0
    // Test_Id:     T024
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    // triggers the removal of the alert from the state, using the universal id, after a timeout of 5 seconds
    // Req_Id:      R0
    // Test_Id:     T025
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id}), timeout);
};