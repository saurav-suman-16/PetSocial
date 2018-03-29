import React from 'react';
import { Link, Route } from 'react-router-dom';
import Post from './Post';
import Newcomment from './Newcomment';
import Showcomment from './Showcomment';
import Rightbar from './Rightbar';
import Uploadpost from './Uploadpost';
import cookie from 'react-cookies'

class Singlepost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            postrecieved: null,
            _id: this.props.match.params._id,
            arr: null
        }
        this.flag = false;
        this.getdata = this.getdata.bind(this);
        this.updatecomment = this.updatecomment.bind(this);
    }

    componentWillReceiveProps(a) {
        this.flag = true
        console.log('adf', a);
        this.getdata(a)
    }

    updatecomment(e) {
        this.getdata();
    }

    componentWillMount() {
        this.getdata();
    }

    getdata(a) {
        let data = {}
        if (this.flag) {
            data = { _id: a.match.params._id }
        } else {
            data = { _id: this.state._id }
        }
        fetch("http://localhost:5000/post/findpost", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => { console.log(response); return response.json() })
            .then(jsonResponse => {
                console.log('res', jsonResponse)
                this.setState({ postrecieved: jsonResponse })
            })
            .catch(error => console.error('error:', error));
    }

    render() {
        console.log('state', this.state)
        return (
            <div>
                <div className="content_lft">
                    <Route path='/main/singlepost/uploadpost' render={() => (<Uploadpost history={this.props.history} />)} />
                    {this.state.postrecieved ? <Post obj={this.state.postrecieved} /> : ""}

                    {this.state.postrecieved ? this.state.postrecieved.comment.map(e => <Showcomment obj={e} />) : ''}
                    <Newcomment _id={this.props.match.params} updatecomment={this.updatecomment} />

                </div>
                <div className="clear" />
            </div>

        );
    }
}

export default Singlepost;