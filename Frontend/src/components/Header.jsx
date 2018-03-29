import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.removeItem('email');
        localStorage.removeItem('currentemail');
        this.props.history.push('/login');
    }

    render(){
        return(
            <div>
                <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container">
              <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
              <a className="brand" href>PPL</a>
              <div className="pro_info pull-right">
                <div className="pro_icn"><img src="/images/pic_small.png" /></div>
                <div className="pro_txt">Me<b className="caret" /></div>
                <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                  <li><Link to='/main/timeline/'>My Profile</Link></li>
                  <li><a tabIndex={-1} href="#">Message Box</a></li>
                  <li><a onClick={this.logout}>Logout</a></li>
                  <li><a tabIndex={-1} href="#" ></a></li>
                  <li className="divider" />
                  <li><Search size='min'/></li>
                </ul>
              </div>
              <div className="nav-collapse collapse">
                <ul className="nav">
                  <li className="active"> <Link to='/main/home/'>Home</Link> </li>
                  <li className> <a href>E-Coupons</a> </li>
                  <li className> <a href>E-Brands</a> </li>
                  <li className> <a href>Resuse Market</a> </li>
                  <li className> <a href>Lost and Found</a> </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="header">
          <div className="header_lft">
            <div className="logo"><a href="#"><img src="/images/logo.png" /></a></div>
            <div className="navigatn">
              <ul>
                <li className="active"><Link to='/main/home/'>Home</Link></li>
                <li><a href="#"> E-Coupons </a></li>
                <li><a href="#">E-Brands </a></li>
                <li><a href="#"> Resuse Market </a></li>
                <li><a href="#"> Lost and Found</a></li>
              </ul>
            </div>
          </div>
          <div className="header_rgt">
            <div className="flag_div"><img src="/images/flag.png" /></div>
            <Search size='max'/>
            <div className="msg_box"><a href="#"><span className="msg_count">100</span></a></div>
            <div className="info_div">
            <div className="pro_info pull-right">
                <div className="pro_icn"><img src="/images/pic_small.png" /></div>
                <div className="pro_txt">Me<b className="caret" /></div>
                <ul className="dropdown-menu " role="menu" aria-labelledby="dLabel">
                  <li><Link to='/main/timeline/'>My Profile</Link></li>
                  <li><a tabIndex={-1} href="#">Message Box</a></li>
                  <li><a onClick={this.logout}>Logout</a></li>
                  <li><a tabIndex={-1} href="#" ></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
            </div>
        );
    }
}

export default Header;