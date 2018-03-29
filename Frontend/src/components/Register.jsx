import React from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies'

class Register extends React.Component {
  constructor(props) {
    super(props),
      this.state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        username: '',
        agree: false
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAgree = this.toggleAgree.bind(this);
    this.checkall = this.checkall.bind(this);
    this.handlegooglelogin = this.handlegooglelogin.bind(this);
  }

  componentWillMount() {
    if (cookie.load('session')) {
      this.props.history.push('/main/timeline/');
    }
  }

  handleChange(data, id) {
    this.setState({
      [id]: data.target.value
    });
  }

  toggleAgree() {
    if (this.state.agree) {
      this.setState({
        agree: false
      })
    } else {
      this.setState({
        agree: true
      })
    }
  }

  checkall(e) {
    let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (this.state.username.length == 0) {
      alert("Username must be at least 6 digits long");
    } else if (this.state.password.length == 0) {
      alert("Password must be at least 7 digits long");
    } else if (!this.state.email.match(re)) {
      alert("Invalid Email");
    } else if (this.state.firstname.length == 0) {
      alert("Firstname cannot be empty");
    } else {
      console.log('call');
      this.handleSubmit(e);
    }
  }


  handleSubmit(e) {
    console.log('handlesubmit');
    e.preventDefault();
    if (this.state.agree) {
      fetch("http://localhost:5000/user/newuser", {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => { return response.json() })
        .then(response => {
          console.log(response)
          if (response.errmsg) {
            alert('Email already used');
          } else {
            alert('Check your email for verification link');
          }
        })
        .catch(error => console.error('error:', error));
    } else {
      alert("You must check the 'I agree to Term & Conditions' box");
    }
  }

  handlegooglelogin() {
    console.log('goooogle')
    window.location = 'http://localhost:5000/auth/login-google';
  }

  render() {
    console.log('adfasdf')
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Create An Account</title>
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Create An Account</h1>
                <ul>
                  <li><span>Username</span><input type="text" pattern=".{6,}" placeholder="Enter your username" onChange={(e) => this.handleChange(e, 'username')} /></li>
                  <li><span>Password</span><input type="password" pattern=".{7,}" placeholder="Enter your password" onChange={(e) => this.handleChange(e, 'password')} /></li>
                  <li><span>Email</span><input type="email" requred placeholder="Enter your email" onChange={(e) => this.handleChange(e, 'email')} /></li>
                  <li><span>First Name</span><input type="text" placeholder="Enter your first name" onChange={(e) => this.handleChange(e, 'firstname')} /></li>
                  <li><span>Last Name</span><input type="text" placeholder="Enter your last name" onChange={(e) => this.handleChange(e, 'lastname')} /></li>
                  <li><input type="checkbox" onClick={this.toggleAgree} />I agree to Term &amp; Conditions</li>
                  <li><input type="submit" defaultValue="Register" onClick={this.checkall} /></li>
                  <li><button style={{ padding: 0, width: 250 }} onClick={this.handlegooglelogin}><img src='/images/googlebutton.png' /></button></li>
                </ul>

                <div className="addtnal_acnt">I already have an account.<Link to='/login'>Login My Account !</Link></div>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
              <img src="/images/img_9.png" alt /> </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    );
  }
};

export default Register;
