import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

class Loginverify extends React.Component {
    constructor(props) {
      super(props),
      this.state = { 
        email:'',
        password:'',
        log:''
      }
      this.handlechange = this.handlechange.bind(this);
      this.handlesubmit = this.handlesubmit.bind(this);
      this.toggleRemember = this.toggleRemember.bind(this);
    }
  
    handlechange(e) {
      this.setState({
        password:e.target.value
      })
    }

    toggleRemember() {
        if(this.state.agree) {
          this.setState({
              remember: false
          })
        } else {
          this.setState({
            remember: true
          })
        }
      }
  
    handlesubmit(e){
      console.log('handlesubmit');
      e.preventDefault();
        if(this.state.password) {
          fetch("http://localhost:5000/user/userlogin", {
              method: 'POST',
              body: JSON.stringify(this.state), 
              headers:{'Accept': 'application/json',
              'Content-Type': 'application/json'
              }
            })
            .then(response => response.json())
            .then(jsonResponse => {
              this.setState({log:jsonResponse.res});
              if(jsonResponse.res=='Password Match')
              {
                console.log("props:",this.props);
                if(this.state.remember){
                    localStorage.setItem('email', this.state.email);
                }
                this.props.history.push('/main/timeline');
              }
            })
            .catch(error => console.error('error:',error));
        } else {
          alert("Enter Password!");
        }
    }
  
    componentWillMount() {
      console.log("componentwillmount",this.props.match.params._id);
      fetch("http://localhost:5000/user/verifyuser", {
            method: 'POST',
            body: JSON.stringify(this.props.match.params), 
            headers:{'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
          })
          .then(response => {
            console.log('Success:', response.ok);
            return response.json();
          })
          .then(response => {
            console.log(response[0].email);
            this.setState({email:response[0].email})
        })
          .catch(error => console.error('error:',error));
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
                    <li><span>Email-ID</span><input type="email"  placeholder={this.state.email} disabled/></li>
                    <li><span>Password</span><input type="password" onChange={this.handlechange} placeholder="Enter your password" />{this.state.log}</li>
                    <li><input type="checkbox" onClick={this.handleSubmit}/>Remember Me</li>
                    <li><input type="submit" defaultValue="Log In" onClick={this.handlesubmit}/><Link to='/forgot'>Forgot Password</Link></li>
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
  }
  ;
  
  export default Loginverify;