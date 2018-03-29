import React from 'react';

class Newcomment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            _id:'',
            comment:'',
            email:localStorage.getItem('currentemail'),
            info:'',
            a:''
        }
        this.handlechange = this.handlechange.bind(this);
        this.handleclick = this.handleclick.bind(this);
    }

    componentWillMount(){
        this.setState({
            _id:this.props._id._id
        })
    }

    handlechange(e){
        this.setState({
            comment:e.target.value,
            info:''
        })
    }


    handleclick(){
        if(this.state.comment.length){
            fetch("http://localhost:5000/post/newcomment",{
            method: 'POST',
            body: JSON.stringify(this.state), 
            headers:{'Accept': 'application/json',
            'Content-Type': 'application/json'
                }
            })
            .then(response => {
                this.props.updatecomment(response);
            })
            .catch(error => console.error('error:',error))
        } else {this.setState({info:'At least write something!'})}
    }

    render(){
        return(
            <div>
                <div className="cmnt_div1">
                    <input type="text" onChange={this.handlechange} placeholder="Enter your Comment" className="cmnt_bx1" /><br />
                    <h3>{this.state.info}</h3>
                    <input type="submit" onClick={this.handleclick} className="sub_bttn1" defaultValue="Submit Comment" />
                </div>
                <div className="view_div">View more</div>
            </div>
        );
    }
}

export default Newcomment;