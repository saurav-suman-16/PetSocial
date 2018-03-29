import React, {
  Component
} from 'react';
import {
  Switch,
  Link,
  Route
} from 'react-router-dom';
import Timeline from '../components/Timeline';
import Singlepost from '../components/Singlepost';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Uploadpost from '../components/Uploadpost';
import Rightbar from '../components/Rightbar';
import Googlelogin from '../components/Googlelogin';

class Mainapp extends Component {
  render() {
    return ( <
      div >
      <
      Route path = '/'
      component = {
        Header
      }
      /> <
      div className = "container" >
      <
      div className = "content" >
      <
      Route path = '/'
      component = {
        Rightbar
      }
      /> <
      Switch >
      <
      Route path = '/main/home/'
      component = {
        Home
      }
      /> <
      Route path = '/main/timeline/'
      component = {
        Timeline
      }
      /> <
      Route path = '/main/googlelogin/:_id'
      component = {
        Googlelogin
      }
      /> <
      Route path = '/main/singlepost/:_id'
      component = {
        Singlepost
      }
      /> <
      /Switch> <
      /div> <
      /div> <
      Footer / >
      <
      /div>
    );
  }
}

export default Mainapp;