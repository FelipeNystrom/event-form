import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Fragment>
        <div className="main">
          <ul className="main-list-container">
            <div className="main-list-row-wrapper">
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
              <Link to="/newsletter">
                <li>
                  <div className="main-list-title">Anmälan till nyhetsbrev</div>
                  <div className="main-list-content">
                    För dig som endast vill få vårt nyhetsbrev
                  </div>
                </li>
              </Link>
            </div>
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default App;
