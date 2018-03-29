import React from 'react';
import { Link } from 'react-router-dom';

class Displaycategories extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            src:null
        }
        this.handlesort = this.handlesort.bind(this);
    }

    componentWillMount(){
        this.setState({
            src:this.props.obj
        })
    }

    handlesort(){

    }

    render() {
        return(
                  
                    <li><a ><Link to={`++${this.props.obj.category}`}><span className="list_icon"><img style={{height:40, width:40}} src={`http://localhost:5000/${this.props.obj.src}`} /></span>{this.props.obj.category}</Link></a></li>
                  
        );
    }
}

export default Displaycategories;