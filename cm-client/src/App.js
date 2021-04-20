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
import symbol from './assets/Enso.png'


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
            <Navbar/>
            <section className="container">
              <Route exact path="/" component={ Home }/>
              <Alert/>
              <Switch>
                <Route exact path="/login" component={ Login } />
                <Route exact path="/register" component={ Register } />
                <PrivateRoute exact path="/dashboard" component={ Dashboard } />
              </Switch>
              <div className="symbol">
                  <img src={symbol} alt='logo' style={{opacity: '0.5'}}/>
              </div>
            </section>
          </Fragment>
        </Router>
    </Provider>
  )
};


  

export default App;
