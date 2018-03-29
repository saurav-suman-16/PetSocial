import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import Loginverify from '../components/Loginverify';
import Menuheader from '../components/Menuheader';
import Footer from '../components/Footer';
import Forgot from '../components/Forgot';
import Reset from '../components/Reset';


class Menuapp extends Component {
  render() {
    return (
      <div>
        <Route  path='/' component={Menuheader}/>
        <Switch>
          <Route path='/login/:_id' component={Loginverify}/>
          <Route exact path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/forgot' component={Forgot}/>
          <Route path='/reset/:_id' component={Reset}/>
          <Route exact path='/' component={Register}/>
        </Switch>
        <Route path='/' component={Footer}/>
      </div>
    );
  }
}

export default Menuapp;
