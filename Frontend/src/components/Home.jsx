import React from 'react';
import { Link, Route } from 'react-router-dom';
import Post from './Post';
import Rightbar from './Rightbar';
import Uploadpost from './Uploadpost';
import cookie from 'react-cookies'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postrecieved: [],
      catrecieved: [],
      latest: 1,
      rsp: ''
    }
    this.getImages = this.getImages.bind(this);
    this.latestfirst = this.latestfirst.bind(this);
    this.oldestfirst = this.oldestfirst.bind(this);
    this.mostcommented = this.mostcommented.bind(this);
    this.rerenderposts = this.rerenderposts.bind(this);
  }

  rerenderposts(a) {
    this.setState({
      rsp: a
    })
    this.getImages();
  }

  componentWillMount() {
    this.getImages();
    //this.getCategories();
  }

  getImages() {
    fetch("http://localhost:5000/post/findposts", { method: 'POST' })
      .then(response => {
        return response.json();
      })
      .then(response => {
        response = response;
        this.setState({ postrecieved: response });
      })
      .catch(error => console.error('error:', error));
  }

  latestfirst() {
    this.setState({
      latest: 1
    })
  }

  oldestfirst() {
    this.setState({
      latest: 2
    })
  }

  mostcommented() {
    this.setState({
      latest: 0
    })
  }

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Home</title>

        <div className="content_lft">
          <div className="contnt_1">
            <div className="list_1">
              <ul>
                <li>
                  <input type="checkbox" className="chk_bx" />
                  Friends</li>
                <li>
                  <input type="checkbox" className="chk_bx" />
                  Flaged</li>
              </ul>
            </div>
            <div className="post_div">
              <div className="post_list">
                <ul>
                  <li onClick={this.latestfirst}><span className="list_img"><img src="/images/img_1.png" /></span>Latest First</li>
                  <li onClick={this.oldestfirst}><span className="list_img"><img src="/images/img_2.png" /></span>Oldest First</li>
                  <li><a><span className="list_img"><img src="/images/img_3.png" /></span>Most Pet</a></li>
                  <li><a><span className="list_img"><img src="/images/img_4.png" /></span>Most Clicks</a></li>
                  <li onClick={this.mostcommented}><span className="list_img"><img src="/images/img_5.png" /></span>Most Commented</li>
                </ul>
              </div>
              <div className="post_txt">4 New Post Updates</div>
            </div>
          </div>
          <Route path='/main/home/uploadpost' render={() => (<Uploadpost rerenderposts={this.rerenderposts} history={this.props.history} />)} />
          {
            this.props.location.pathname.indexOf('++') < 0 ?

              this.state.latest == 1 ? this.state.postrecieved.map(a => <div class="contnt_2"><Post obj={a} /></div>).reverse() :
                this.state.latest == 2 ? this.state.postrecieved.map(a => <div class="contnt_2"><Post obj={a} /></div>) :
                  this.state.latest == 0 ? this.state.postrecieved.sort((a, b) => b.comment.length - a.comment.length).map(a => <div class="contnt_2"><Post obj={a} /></div>) : '' :
              this.state.postrecieved.filter(word => word.categoty == this.props.location.pathname.split('++')[1]).map(a => <div class="contnt_2"><Post obj={a} /></div>)
          }


        </div>

        <div className="clear" />
      </div>
    );
  }
}

export default Home;