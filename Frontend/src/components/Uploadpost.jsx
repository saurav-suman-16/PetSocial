import React from 'react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';

class Uploadpost extends React.Component{
    constructor(props) {
        super(props)
        this.state = { 
            uploadername:'',
            info: null,
            email: localStorage.getItem('currentemail'),
            description: null,
            category: 'OTHERS',
            acceptedFiles: null,
            preview: null,
            categorylist: []
        }
        this.handleDrop = this.handleDrop.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDropAccepted = this.onDropAccepted.bind(this);
        this.getcategorylist = this.getcategorylist.bind(this);
    }

    componentWillMount(){
        this.getcategorylist();
    }

    handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("uploadername",this.state.uploadername);
        formData.append("email",this.state.email);
		formData.append("description",this.state.description);
		formData.append("category",this.state.category);
        formData.append("acceptedFiles",this.state.acceptedFiles);
        let options = {
            method: 'POST',
            body: formData
        }
        console.log('FormData:',formData);
        console.log('Calling fetch');
        fetch("http://localhost:5000/post/post", options)
        .then(response => {
        console.log('Success:', response.ok);
        this.props.history.goBack();
        this.props.rerenderposts(response);
        })
        .catch(error => console.error('error:',error));
    } 

    getcategorylist() {
        console.log("getcategorylist")
        fetch("http://localhost:5000/category/find", { method: 'POST'})
        .then(response => {
            return response.json();
        })
        .then(response => {
            response = response.reverse();
            this.setState({categorylist:response})
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

    handleSelect(e) {
    this.setState({
            [e.target.name]:e.target.value
    })
    }

    render() {
        return(
            <div>
                <meta charSet="utf-8" />
                <title>Upload Post</title>
                <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
                <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
                <div class="container">    
                    <div class="div_a" style={{maxWidth:600}}>
                        <div class="div_title">Create New Post</div><img src='/images/clos.png' style={{float:'right'}} onClick={this.props.history.goBack} />
                        <form class="div_top" encType="multipart/form-data" id="uploadForm">
                            <Dropzone style={{ float:'left', width: 300, height: 300, borderWidth: 2, borderStyle: 'dashed', borderRadius: 5}} onDrop={ this.handleDrop } accept="image/jpeg,image/jpg,image/tiff,image/gif" multiple={ false } onDropRejected={ this.handleDropRejected }>
                            { this.state.preview ? <span><img style={{height:300, width:300}} src={ this.state.preview } alt="image preview" /></span> : "Drag a file here or click to upload." }
                            </Dropzone>
                            <div style={{float:'right'}}><textarea onChange={this.handleSelect} style={{width: 250, height: 150}} name="description" placeholder="Enter Description here..."></textarea><br />
                            <br /><select name="category" onChange={this.handleSelect}>
                            {this.state.categorylist.map( a => <option value={a.category}>{a.category}</option> )}
                                <option value="OTHERS" selected>Others</option>
                            </select><br /><br />
                            <button type="Submit" onClick={this.handleSubmit}>Post</button>
                            <h1>{this.state.info}</h1>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Uploadpost;