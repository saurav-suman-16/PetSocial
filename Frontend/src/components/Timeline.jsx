import React from 'react';
import { Link, Route } from 'react-router-dom';
import Uploadpost from './Uploadpost';
import Post from './Post';
import Profile from './Profile';
import cookie from 'react-cookies'

class Timeline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postrecieved: [],
      catrecieved: [],
      uploadc: false,
      uploadp: false,
      rsp: ''
    }
    this.getImages = this.getImages.bind(this);
    this.rerenderposts = this.rerenderposts.bind(this);
  }

  rerenderposts(a) {
    this.setState({
      rsp: a
    })
    this.getImages();
  }

  componentWillMount() {
    this.getImages();
  }

  getImages() {
    /*let data = {
      email: localStorage.getItem('currentemail')
    }*/
    fetch("http://localhost:5000/post/finduserposts", {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        response = response.reverse();
        this.setState({ postrecieved: response });
      })
      .catch(error => console.error('error:', error));
  }

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Home</title>

        <div className="content_lft">
          <Profile />
          <Route path='/main/timeline/uploadpost' render={() => (<Uploadpost rerenderposts={this.rerenderposts} history={this.props.history} />)} />

          {
            this.props.location.pathname.indexOf('++') < 0 ? this.state.postrecieved.map(a => <div class="contnt_2"><Post obj={a} /></div>) : this.state.postrecieved.filter(word => word.categoty == this.props.location.pathname.split('++')[1]).map(a => <div class="contnt_2"><Post obj={a} /></div>)
          }

        </div>

        <div className="clear" />
      </div>
    );
  }
}

export default Timeline;