import React from 'react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';

class Uploadcategory extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            category: '',
            acceptedFiles: null,
            preview: null,
        }
        this.handleDrop = this.handleDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onDropAccepted = this.onDropAccepted.bind(this);
    }

    handleChange(e){
        this.setState({
            category:e.target.value
        })
    }

    componentDidUpdate(){
        console.log('updated');
    }

    handleSubmit(e) {
        console.log('handlesubmit');
        e.preventDefault();
        let formData = new FormData();
		formData.append("category",this.state.category.toUpperCase());
        formData.append("acceptedFiles",this.state.acceptedFiles);
        let options = {
            method: 'POST',
            body: formData
        }
        console.log('FormData:',formData);
        console.log('Calling fetch');
        fetch("http://localhost:5000/category/new", options)
        .then(response => {
        console.log('Success:', response);
        this.props.rerenderDisplaycategories(response);
        console.log("sent");
        })
        .catch(error => console.error('error:',error));
    } 

    onDropAccepted ([{ preview }]) {
        console.log("acce:",preview);
        this.setState({
            info:null,
            preview
         })
    }

    handleDrop(acceptedFiles, rejectedFiles) {
        this.setState({ 
            acceptedFiles: acceptedFiles[0]
         })
        console.log("Accepted: ",acceptedFiles[0]);
        console.log("Rejected: ",rejectedFiles);
        if(acceptedFiles[0])
            this.onDropAccepted(acceptedFiles);
        this.onDropRejected(rejectedFiles);
    }

    onDropRejected(rejectedFiles) {
        rejectedFiles.length ? this.setState({info:"Invalid image type", preview:null}) : this.setState({info:null})
        console.log("Invalid Image Type",rejectedFiles);
    }

    render(){
        return(
                <form encType="multipart/form-data" id="uploadForm">
                    <Dropzone  onDrop={ this.handleDrop } style={{ float:'left', width: 100, height: 100, borderWidth: 2, borderStyle: 'dashed', borderRadius: 5}} accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png" multiple={ false }>
                    { this.state.preview ? <span><img style={{height:100, width:100}} src={ this.state.preview } alt="image preview" /></span> : "Drag a file here or click to upload." }
                    </Dropzone>
                    <div style={{float:'right'}}>
                        Enter new category<br/>
                        <input style={{width: 150}} onChange={this.handleChange} type='text'/><br /><br />
                        <button type="Submit" onClick={this.handleSubmit}>Post</button>
                    </div>
                    
                </form>
        );
    }
}

export default Uploadcategory;