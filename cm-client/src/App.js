import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/router/PrivateRoute';
// Wrapper for combining React and Redux
import { Provider } from 'react-redux';
// REDUX STORE
import store from './store';
import { userPresent } from './actions/auth';
import setAuthToken from './helpers/setAuthToken';
import CreateProfile from './components/profile_forms/CreateProfile';
import EditProfile from './components/profile_forms/EditProfile';
import AddMilestone from './components/profile_forms/AddMilestone';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Checkins from './components/checkins/Checkins';
import Checkin from './components/checkin/Checkin';
import Chats from './components/chats/Chats';
import CheckinsAll from './components/checkins/CheckinsAll';
// REFERENCE 
// https://www.npmjs.com/package/socket.io 
// https://socket.io/docs/v3/client-initialization/

if(localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  // useEffect hook
  useEffect(() => {
    // accessing the redux store to call the dispatch user present action (runs once)
    store.dispatch(userPresent());
  }, []);

  return (
    <Provider store={store}>
        <Router>
          <Fragment>
          <section className="container">
            <Navbar/>
            
              <Route exact path="/" component={ Home }/>
              <Alert/>
              <Switch>
                <Route exact path="/login" component={ Login } />
                <Route exact path="/register" component={ Register } />
                <Route exact path="/profiles" component={ Profiles } />
                <PrivateRoute exact path="/chats" component={ Chats } />
                <PrivateRoute exact path="/checkin/:id" component={ Checkin } />
                <PrivateRoute exact path="/checkins" component={ Checkins } />
                <PrivateRoute exact path="/checkins/all" component={ CheckinsAll } />
                <PrivateRoute exact path="/profile/:id" component={ Profile } />
                <PrivateRoute exact path="/dashboard" component={ Dashboard } />
                <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
                <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
                <PrivateRoute exact path="/add-milestone" component={ AddMilestone } />
              </Switch>
            </section>
            
          </Fragment>
        </Router>
    </Provider>
  )
};


  

export default App;
