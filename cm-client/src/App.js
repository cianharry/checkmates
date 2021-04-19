import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
// Wrapper for combining React and Redux
import { Provider } from 'react-redux';
// REDUX STORE
import store from './store';



const App = () =>
<Provider store={store}>
  <Router>
    <Fragment>
      <Navbar/>
      <Route exact path="/" component={ Home }/>
      <Route exact path="/register" component={ Register }/>
      <section className="container">
        <Switch>
          <Route exact path="/login" component={ Login }/>
        </Switch>
      </section>
    </Fragment>
  </Router>
</Provider>

  

export default App;
