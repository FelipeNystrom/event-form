import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './navigation.css';

class Navigation extends Component {
  render() {
    const { history } = this.props;
    return (
      <nav>
        <div className="navigation-wrapper">
          <FontAwesomeIcon
            className="navItems fa-3x"
            onClick={() => history.go(-1)}
            icon="arrow-left"
          />
          <Link to="/">
            <FontAwesomeIcon className="navItems fa-3x" icon="home" />
          </Link>
          <FontAwesomeIcon
            className="navItems fa-3x"
            onClick={() => history.go(1)}
            icon="arrow-right"
          />
        </div>
      </nav>
    );
  }
}

export default Navigation;
