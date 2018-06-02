import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Profiles from './Profiles';
import Profile from './Profile';
import MyProfile from './MyProfile';
import SignUpPage from './Forms/SignUpForm'


import LandingPage from './LandingPage';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/profiles" component={Profiles}/>
        <Route exact path="/profiles/details/:user_id" component={Profile}/>
        <Route exact path="/profiles/myprofile" component={MyProfile}/>
        <Route exact path="/signup" component={SignUpPage} />
        {/*<Route exact path="/signin" component={SignInPage} />*/}
        {/*<Route exact path="/menu" component={NavbarCollapseMenu} />*/}
        {/*<Route exact path="/dashboard/:id" component={Dashboard} />*/}

      </div>
    );
  }
}

export default App;
