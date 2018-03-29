import React from 'react';
import { Link } from 'react-router-dom';
import Profileform from './Profileform';
import Picform from './Picform';

class Profile extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            userdata: {},
            edit: false,
            pic: false
        }
        this.getprofile = this.getprofile.bind(this);
        this.handleedit = this.handleedit.bind(this);
        this.handlepic = this.handlepic.bind(this);
        this.formupdated = this.formupdated.bind(this);
    }

    componentWillMount(){
        this.getprofile();
    }

    getprofile() {
        let data={email:localStorage.getItem('currentemail')}
        fetch("http://localhost:5000/user/finduserdata",{
            method: 'POST',
            body: JSON.stringify(data), 
            headers:{'Accept': 'application/json',
            'Content-Type': 'application/json'
                }
            })
          .then(response => { return response.json();})
          .then(response => {
            this.setState({userdata:response,
            pic:false});
          })
          .catch(error => console.error('error:',error));     
    }

    handleedit(){
        this.state.edit ? this.setState({edit:false}) : this.setState({edit:true})
    }

    handlepic(){
        this.state.pic ? this.setState({pic:false}) : this.setState({pic:true})
    }

    formupdated(response){
        this.getprofile();
    }

    render() {
        return(
            <div>
                <div className="contnt_1">
                <div className="list_1">
                  <ul>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Friends</li>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Flaged</li>
                  </ul>
                </div>
                <div className="timeline_div">
                  <div className="timeline_div1">
                    <div className="profile_pic">
                      {this.state.userdata.src ? this.state.userdata.src.charAt(4)=='s' ? <img src={`${this.state.userdata.src}`} /> : <img src={`http://localhost:5000/${this.state.userdata.src}`} />:''}
                      <div className="profile_text"><a href='#' onClick={this.handlepic}>Change Profile Pic</a></div>
                    </div>
                    <div className="profile_info">
                      <div className="edit_div" onClick={this.handleedit}>Edit <img src="/images/timeline_img.png" /></div>
                      <div className="profile_form">
                        <ul>
                          <li>
                            <div className="div_name1">Name :</div>
                            <div className="div_name2">{this.state.userdata.firstname} {this.state.userdata.lastname}</div>
                          </li>
                          <li>
                            <div className="div_name1">Sex :</div>
                            <div className="div_name2">{this.state.userdata.sex}</div>
                          </li>
                          <li>
                            <div className="div_name1">Description :</div>
                            <div className="div_name3">{this.state.userdata.description}</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="timeline_div2">
                    <ul>
                      <li><a href="#" className="active">Timeline    </a></li>
                      <li><a href="#">About  </a></li>
                      <li><a href="#">Album</a></li>
                      <li><a href="#"> Pets</a></li>
                      <li><a href="#">My Uploads </a></li>
                    </ul>
                  </div>
                </div>
              </div>
              { this.state.pic ? <Picform obj={this.state.userdata} formupdated={this.formupdated}/> : ''}
              { this.state.edit ? <Profileform obj={this.state.userdata} formupdated={this.formupdated}/> : ''}
            </div>
        );
    }
}

export default Profile;