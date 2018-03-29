import React from 'react';
import { Link } from 'react-router-dom';

class Post extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            src:{
                like:[]
            },
            userdata: {},
            like: false
        }
        this.time = this.time.bind(this);
        this.date = this.date.bind(this);
        this.handlelike = this.handlelike.bind(this);
        this.getuserdata = this.getuserdata.bind(this);
    }
    componentWillMount(){
        this.props.obj.like.includes(localStorage.getItem('currentemail')) ? this.setState({like:true, src:this.props.obj}) : this.setState({src:this.props.obj})
        this.getuserdata();
    }

    

    date(){
        const created_date = new Date(this.props.obj.time);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const year = created_date.getFullYear();
        const month = months[created_date.getMonth()];
        const date = created_date.getDate();
        const dated = date + ' ' + month + ' ' + year;
        return dated;
    }

    time(){
        const created_date = new Date(this.props.obj.time);
        let hour = created_date.getHours();
        let ap = '';
        hour > 12 ? (hour-= 12, ap='PM'): (ap='AM')
        const min = created_date.getMinutes();
        let mint = '';
        min < 10 ? mint='0'+min : mint = ''+min;
        const timed = hour + ':' + mint + ' ' + ap;
        return timed;
    }

    handlelike() {
        this.setState({
            like: !this.state.like
        })
        let email = localStorage.getItem('currentemail')
        let bdypsh = {
            _id:this.props.obj._id,
            todo: '$push',
            email: email
        }
        
        let bdypll = {
            _id:this.props.obj._id,
            todo: '$pull',
            email: email
        }
        let bdy;
        this.state.like ? bdy=bdypll : bdy=bdypsh;
        fetch("http://localhost:5000/post/updatelike",{
        method: 'POST',
        body: JSON.stringify(bdy), 
        headers:{'Accept': 'application/json',
        'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                src: response
            })
        })
        .catch(error => console.error('error:',error));
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
            this.setState({
                userdata: response
            })
        })
        .catch(error => console.error('error:',error));
    }

    render() {
        return(
            <div>
                <div className="div_a">
                  <div className="div_title">{this.props.obj.description}</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">{this.props.obj.categoty}</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft">{this.state.userdata.src ? this.state.userdata.src.charAt(4)=='s' ? <img style={{width: 50}} src={`${this.state.userdata.src}`} /> : <img style={{width: 50, borderRadius:10}} src={`http://localhost:5000/${this.state.userdata.src}`} />:''}{this.props.obj.uploadername}</div>
                    <div className="div_top_rgt"><span className="span_date">{this.date()}</span><span className="span_time">{this.time()}</span></div>
                  </div><br />
                  <Link to={`/main/singlepost/${this.props.obj._id}`}><div className="div_image"><img src={`http://localhost:5000/${this.props.obj.src}`} alt="pet" /></div></Link>
                  <div className="div_btm">
                  {this.state.src.like ? this.state.src.like.length == 1 ? <h3> {this.state.src.like.length} like </h3> : this.state.src.like.length == 0 ? <h3> No one liked this post </h3> : <h3> {this.state.src.like.length} likes </h3> :'' }
                    <div className="btm_list">
                      <ul>
                        <li><a ><span className="btn_icon"><img src="/images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a ><span className="btn_icon"><img src="/images/icon_002.png" alt="share" /></span>Flag</a></li>
                        <li><a onClick={this.handlelike}><span className="btn_icon"><img src="/images/icon_003.png" alt="share" /></span>{!this.state.like ? "Like" : "Unlike"}</a></li>
                        <li><a ><span className="btn_icon"><img src="/images/icon_004.png" alt="share" /></span>{this.props.obj.comment.length} Comments</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}

export default Post;