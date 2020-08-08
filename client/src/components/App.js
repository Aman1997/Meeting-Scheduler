import React from 'react';
import { Switch, Route} from 'react-router-dom';
import './App.css';
import LandingPage from './LandingComponent/LandingComponent';
import Login from './LoginComponent/LoginComponent';
import Signin from './SignInComponent/SignInComponent';
import Home from './HomeComponent/HomeComponent';
import Auth from './auth';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signin' component={Signin} />
        <Route path='/home' component={Auth(Home, true)} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </div>
  );
}

export default App;
