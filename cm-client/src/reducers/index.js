// ROOT REDUCER
import { combineReducers } from 'redux';
import alerts from './alerts';
import auth from './auth';
import profile from './profile'
// object containing all of the application reducers
export default combineReducers({
    alerts,
    auth,
    profile
});