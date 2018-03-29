import React from "react";
import { Link, Route } from 'react-router-dom';

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            search: '',
            data: []
        }
        this.flag = true;
        this.interval = null
        this.handlesearch = this.handlesearch.bind(this);
        this.getdata = this.getdata.bind(this);
        this.onblur = this.onblur.bind(this);
    }


    handlesearch(e){
        this.setState({search:e.target.value})
        if(this.flag){
            this.interval = setInterval(this.getdata, 3000);
            this.flag = false;
        }
    }

    onblur(){
        clearInterval(this.interval);
        this.flag = true;
    }

    getdata(){
        console.log('zxcv');
        fetch("http://localhost:5000/post/search", {
        method: 'POST',
        body: JSON.stringify({key:this.state.search}), 
        headers:{'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json();})
        .then(response => {
            console.log('re',response)
          this.setState({data:response});
        })
        .catch(error => console.error('error:',error));  
    }

    render(){
        return(
            <div className='dropdwn'>
                {
                    this.props.size == 'min' ? 
                    <input onChange={this.handlesearch} onBlur={this.onblur} type="text" placeholder="search" /> :
                    <input onChange={this.handlesearch} onBlur={this.onblur} type="text" placeholder="Search" className="txt_box" />
                }
                <div className='dropdwn-content'>
                    {this.state.data.length ? <ul>{this.state.data.map(a => <Link to={`/main/singlepost/${a._id}`}><li onClick={this.redirect}>{a.description}</li></Link> )}</ul> : ''}
                </div>
            </div>
        );
    }
}

export default Search;