import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import Menuapp from './Menuapp';
import Mainapp from './Mainapp';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/main' component={Mainapp} />
          <Route path='/' component={Menuapp} />
        </Switch>
      </div>
    );
  }
}

export default App;
