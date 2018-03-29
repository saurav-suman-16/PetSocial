import React from 'react';
import Dropzone from 'react-dropzone';

class Profileform extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            _id:'',
            firstname:'',
            lastname:'',
            description:'',
            sex:'Other',
            preview:null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount(){
        this.setState({
            _id:this.props.obj._id,
            firstname:this.props.obj.firstname,
            lastname:this.props.obj.lastname,
            description:this.props.obj.description,
            sex:this.props.obj.sex,
        })
    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
    })
    }

    handleSubmit(e){
        e.preventDefault();
        fetch("http://localhost:5000/user/updatedetails", {
            method: 'POST',
            body: JSON.stringify(this.state), 
            headers:{'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        .then(response => {
        console.log('Success:', response.ok);
        this.props.formupdated(response);
        })
        .catch(error => console.error('error:',error));
    }
    
    render(){
        return(
            <div class='div_a contnt_2'><br />
            
            <form encType="multipart/form-data" id="uploadForm" style={{marginLeft: 150}}>
                        First Name: <input name='firstname' defaultValue={this.state.firstname} style={{width: 200}} onChange={this.handleChange} type='text'/><br /><br />
                        Last Name: <input name='lastname' defaultValue={this.state.lastname} placeholder="Last Name" style={{width: 200}} onChange={this.handleChange} type='text'/>
                        <br /><br />
                        <textarea onChange={this.handleChange} style={{width: 350, height: 150}} defaultValue={this.state.description} name="description" placeholder="Enter Description here..."></textarea> <br /><br />
                        <select name="sex" defaultValue={this.state.sex} onChange={this.handleChange}>
                            <option value="Male" >Male</option>
                            <option value="Female" >Female</option>
                            <option value="Other" >Other</option>
                        </select><br /><br />
                        <button type="Submit" onClick={this.handleSubmit}>Update</button>
                    
                </form>
                </div>
        );
    }
}

export default Profileform;