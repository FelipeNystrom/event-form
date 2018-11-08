import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <div className="main">
          <ul className="main-list-container">
            <div className="main-list-row-wrapper">
              <div className="row">
                <Link to="/order">
                  <li>
                    <div className="main-list-title">Beställ prover</div>
                    <div className="main-list-content">
                      Välj mellan våra olika provpaket
                    </div>
                  </li>
                </Link>
                <Link to="/buy">
                  <li>
                    <div className="main-list-title">Köp produkter</div>
                    <div className="main-list-content">
                      Köp här eller beställ till kliniken och få mässrabatt
                    </div>
                  </li>
                </Link>
              </div>
              <div className="row">
                <Link to="/newsletter">
                  <li>
                    <div className="main-list-title">
                      Anmälan till nyhetsbrev
                    </div>
                    <div className="main-list-content">
                      För dig som endast vill få vårt nyhetsbrev
                    </div>
                  </li>
                </Link>
                <Link to="/ambassador">
                  <li>
                    <div className="main-list-title">
                      Bli officiell Plackers ambassadör
                    </div>
                    <div className="main-list-content">
                      Samarbeta med oss och få förmåner
                    </div>
                  </li>
                </Link>
              </div>
            </div>
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default App;
