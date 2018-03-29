import React from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies'

class Login extends React.Component {

  constructor(props) {
    super(props),
      this.state = {
        email: '',
        password: '',
        remember: false,
        log: '',
        reset: false
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.forgotpassword = this.forgotpassword.bind(this);
    this.toggleRemember = this.toggleRemember.bind(this);
    this.handlegooglelogin = this.handlegooglelogin.bind(this);
  }


  toggleRemember() {
    if (this.state.agree) {
      this.setState({
        remember: false
      })
    } else {
      this.setState({
        remember: true
      })
    }
  }

  handleChange(data, id) {
    this.setState({
      [id]: data.target.value
    });
  }

  forgotpassword(e) {
    this.state.reset ? this.setState({ reset: false }) : this.setState({ reset: true })
  }

  handleSubmit(e) {
    console.log('handlesubmit');
    e.preventDefault();
    if (this.state.password) {
      fetch("http://localhost:5000/user/userlogin", {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(jsonResponse => {
          console.log("res:", jsonResponse.res);
          this.setState({ log: jsonResponse.res });
          if (jsonResponse.res == 'Password Match') {
            console.log("props:", this.props);
            if (this.state.remember) {
              localStorage.setItem('email', this.state.email);
            }
            localStorage.setItem('currentemail', this.state.email);
            this.props.history.push('/main/timeline/');
          }
        })
        .catch(error => console.error('error:', error));
    } else {
      alert("Enter Password!");
    }
  }

  handlegooglelogin(e) {
    e.preventDefault();
    window.location = 'http://localhost:5000/auth/login-google';
  }

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Login Account</title>
        <link href="/css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="/css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="login_sec">
                <h1>Log In</h1>
                <ul>
                  <li><span>Email-ID</span><input type="email" onChange={(e) => this.handleChange(e, 'email')} placeholder="Enter your email" /></li>
                  <li><span>Password</span><input type="password" onChange={(e) => this.handleChange(e, 'password')} placeholder="Enter your password" />{this.state.log}</li>
                  <li><input type="checkbox" onClick={this.toggleRemember} />Remember Me<Link to='/forgot'>Forgot Password</Link></li>
                  <li><input type="submit" defaultValue="Log In" onClick={this.handleSubmit} /></li>
                  <li><button style={{ padding: 0, width: 250 }}><img src='/images/googlebutton.png' onClick={this.handlegooglelogin} /></button></li>
                </ul>
                <div className="addtnal_acnt">I do not have any account yet.<Link to='/register'>Create My Account Now !</Link></div>
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

export default Login;