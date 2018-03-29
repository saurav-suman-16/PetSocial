import React from 'react';

class Googlelogin extends React.Component{
    constructor(props){
        super(props)
    }
  
    render(){
        localStorage.setItem('currentemail',this.props.match.params._id)
        this.props.history.push('/main/timeline/');
        return(<h1>Please wait while we redirect you</h1>)
    }
}
export default Googlelogin;

