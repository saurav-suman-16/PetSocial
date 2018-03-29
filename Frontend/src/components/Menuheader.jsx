import React from 'react';
import { Link } from 'react-router-dom';

class Menuheader extends React.Component{
    render(){
        return(
            <div>
        <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container">
              <a className="brand" href>PPL</a>
            </div>
          </div>
        </div>
        <div className="header">
            <div className=" header_lft logo"><a href="#"><img src="/images/logo.png" /></a></div>
          <div className="header_rgt">
            <div className="flag_div"><img src="/images/flag.png" /></div>
            <input type="text" placeholder="Search" className="txt_box" />
          </div>
        </div>
            </div>
        );
    }
}

export default Menuheader;