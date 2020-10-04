import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import 'jquery';
import DefaultLayout from './Container/DefaultLayout';
import Login from './Container/Login';
import './App.css';
import './firebase';
import * as firebase from 'firebase';
// Imports: Redux Persist Persister
import { store, persistor } from './Helper/Store';


function PrivateRoute({ component: Component, ...rest }) {
  const isUserLoggedIn = firebase.auth().currentUser;
  return (
    <Route {...rest} render={(props) => (
      isUserLoggedIn
        ? <Component {...props} />
        : <Redirect to="/login" />
    )} />
  );
}

function PublicRoute({ component: Component, ...rest }) {
  const isUserLoggedIn = firebase.auth().currentUser;
  return (
    <Route {...rest} render={(props) => (
      !isUserLoggedIn
        ? <Component {...props} />
        : <Redirect to="/home" />
    )} />
  );
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              <PrivateRoute exact path="/home" name="app" component={DefaultLayout} />
              <PublicRoute exact path="/login" name="app" component={Login} />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;