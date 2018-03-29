import React from 'react';
import { Link } from 'react-router-dom';
import Uploadcategory from './Uploadcategory';
import Displaycategories from './Displaycategories';

class Rightbar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          catrecieved: [],
          uploadc: false,
          rsp:''
        }
        this.handleUploadCategoryClick = this.handleUploadCategoryClick.bind(this);
        this.rerenderDisplaycategories = this.rerenderDisplaycategories.bind(this);
        this.getCategories = this.getCategories.bind(this);
    }

    componentWillMount(){
        this.getCategories();
    }

    rerenderDisplaycategories(a){
        this.setState({
          rsp:a
        })
        this.getCategories();
      }

      getCategories(){
        fetch("http://localhost:5000/category/find", { method: 'POST'})
        .then(response => {
          return response.json();})
        .then(response => {
          response = response.reverse();
          this.setState({catrecieved:response});
        })
        .catch(error => console.error('error:',error));
      }
  
      handleUploadCategoryClick() {
        let uploadc = this.state.uploadc;
        uploadc ? this.setState({uploadc:false}) : this.setState({uploadc:true})
      }

    render(){
        return(
            
            <div className='content_rgt'>
            <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <Link to='uploadpost'>Upload Post</Link> </div>
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#" onClick={this.handleUploadCategoryClick}>Upload Category</a> </div>
              {
                this.state.uploadc ? <div><div class="div_a contnt_2"><Uploadcategory rerenderDisplaycategories={this.rerenderDisplaycategories}/></div><div class="contnt_2"></div></div> : <div></div>
              }
              <div className="rght_cate ">
                <br /><div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                <div className="rght_list">
                <ul>
              {
                this.state.catrecieved.map( a => <Displaycategories obj={a}/>)
              }
              <li><a ><Link to={`++OTHERS`}><span className="list_icon"><img style={{height:40, width:40}} src='/images/Others.jpg' /></span>OTHERS</Link></a></li>
              <li><a ><Link to={` `}><span className="list_icon"><img style={{height:40, width:40}} src='/images/All.jpg' /></span>ALL</Link></a></li>
              </ul>
               </div>
              </div>
              </div>
        );
    }
}

export default Rightbar;