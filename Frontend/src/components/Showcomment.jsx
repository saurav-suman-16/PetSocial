import React from 'react';
import Newcomment from './Newcomment';

class Showcomment extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
        userdata: {}
    }
    this.getuserdata = this.getuserdata.bind(this);
}

componentWillMount(){
  this.getuserdata();
}

  getuserdata(){
    let data = {
        email: localStorage.getItem('currentemail')
      }
    fetch("http://localhost:5000/user/finduserdata",{
    method: 'POST',
    body: JSON.stringify(data), 
    headers:{'Accept': 'application/json',
    'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log('post:',response);
        this.setState({
            userdata: response
        })
    })
    .catch(error => console.error('error:',error));
}

    render(){
        return(
            <div className="contnt_3">
                  <ul>
                      <li>
                      <div className="list_image">
                        <div className="image_sec">{this.state.userdata.src ? this.state.userdata.src.charAt(4)=='s' ? <img style={{width: 50}} src={`${this.state.userdata.src}`} /> : <img src={`http://localhost:5000/${this.state.userdata.src}`} />:''}</div>
                        <div className="image_name">{this.props.obj.name}</div>
                      </div>
                      <div className="list_info">
                        {this.props.obj.comment}
                      </div>
                      <input type="button" defaultValue="Reply" className="orng_btn" />
                    </li>
                  </ul>
                </div>
        );
    }
}

export default Showcomment;