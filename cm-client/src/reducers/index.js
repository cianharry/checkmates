// ROOT REDUCER
import { combineReducers } from 'redux';
import alerts from './alerts';
import auth from './auth';
// object containing all of the application reducers
export default combineReducers({
    alerts,
    auth
});