import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo/site-logo-plackers.svg';
import './logo.css';
class Logo extends Component {
  render() {
    return (
      <div className="logo-section-container">
        <Link to="/">
          <div className="logo-wrapper">
            <img src={logo} alt="#" />
          </div>
        </Link>
      </div>
    );
  }
}

export default Logo;
