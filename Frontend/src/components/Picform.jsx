import React from 'react';
import Dropzone from 'react-dropzone';

class Picform extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            _id:'',
            preview:null,
            acceptedFiles:null,
            info:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDropAccepted = this.onDropAccepted.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.onDropRejected = this.onDropRejected.bind(this);
    }
    componentWillMount(){
        this.setState({
            _id:this.props.obj._id
        })
    }

    onDropAccepted ([{ preview }]) {
        this.setState({
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

    handleSubmit(e){
        e.preventDefault();
        if(this.state.preview){
            let formData = new FormData();
            formData.append("_id",this.state._id);
            formData.append("acceptedFiles",this.state.acceptedFiles);
            let options = {
                method: 'POST',
                body: formData
            }
            fetch("http://localhost:5000/user/updateimage", options)
            .then(response => {
            console.log('Success:', response.ok);
            this.props.formupdated(response);
            })
            .catch(error => console.error('error:',error));
        } else {
            this.setState({info:'At lest select a pic'})
        }
    }
    
    render(){
        return(
            <div class='div_a contnt_2'><br />
            <form encType="multipart/form-data" id="uploadForm">
                <Dropzone style={{ float:'left', width: 150, height: 150, borderWidth: 2, borderStyle: 'dashed', borderRadius: 5}} onDrop={ this.handleDrop } accept="image/jpeg,image/jpg,image/tiff,image/gif,imahe" multiple={ false }>
                    { this.state.preview ? <span><img style={{height:150, width:150}} src={ this.state.preview } alt="image preview" /></span> : "Drag a file here or click to upload." }
                </Dropzone>
                <h3>{this.state.info}</h3>
                <button style={{marginLeft: 20}} type="Submit" onClick={this.handleSubmit}>Update</button>
                </form>
            </div>
        );
    }
}

export default Picform;