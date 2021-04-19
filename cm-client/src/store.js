// Redux Store
// REFERENCE: https://github.com/reduxjs/redux-devtools#documentation 

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

//initial state
const initState = {};
// thunk middleware
const middle = [thunk];
// creating the redux store
const store =  createStore(rootReducer, initState, composeWithDevTools(applyMiddleware(...middle)));

export default store;
