import React from 'react';

class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      submit: false
    }
    this.handleclick = this.handleclick.bind(this);
    this.handleclose = this.handleclose.bind(this);
    this.handlechange = this.handlechange.bind(this);
  }

  handleclick(e){
    e.preventDefault();
    if(this.state.email) {
      fetch("http://localhost:5000/user/forgotpassword", {
          method: 'POST',
          body: JSON.stringify(this.state), 
          headers:{'Accept': 'application/json',
          'Content-Type': 'application/json'
          }
        })
        .then(response => {return response.json()})
        .then(response => {
          if(response.res == "Email not registered"){
            alert("Email not registered");
          } else {
          this.setState({submit:true})
          }
      })
        .catch(error => console.error('error:',error));
    } else {
      alert("Enter Email!");
    }
  }

  handleclose(){
    this.setState({
      submit:false
    })
  }

  handlechange(e){
    this.setState({
      email: e.target.value
    })
  }

  render() {
    return (
      <div>
        {this.state.submit ? <div id='pop_forgt' className='popup_sec'>
          <div className='clos_btn'>
            <img src='images/clos.png' alt='' id='clos_pop' onClick={this.handleclose} />
          </div>
          <div className='pop_hdr'>
            A mail has been send to your e-mail Id for Reset Password Link
          </div>
          <div className='man_contnt'>
            <span>Please Check Your Mail Box!</span>
            <input type='submit' value='Ok' onClick={this.handleclose} />
          </div> 
    </div> : '' }
      
        <div className='container'>
          <div className='content'>
            <div className='content_rgt'>
              <div className='register_sec'>
                <h1>Forgot Password</h1>
                <ul>
                  <li>
                    <span>Enter E-mail ID</span>
                    <input type='text' name='email' onChange={this.handlechange} placeholder='User@gmail.com' />
                  </li>
                  <li>
                    <input type='submit' value='Submit' onClick={this.handleclick}/>
                  </li>
                </ul>
              </div>
            </div>
            <div className='content_lft'>
              <h1>Welcome from PPL!</h1>
              <p className='discrptn'>
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which
                don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in
                the middle of text.
              </p> <img src='images/img_9.png' alt='' />
            </div>
          </div>
        </div>
        <div className='clear' />

      </div>
      );
  }
}

export default Forgot;