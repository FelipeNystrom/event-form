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
                  <div className="main-list-title">Tilaa näytteitä</div>

                  <div className="main-list-content">
                    Valitse sinulle sopiva näytepakkaus
                  </div>
                </li>
              </Link>
              <Link to="/buy">
                <li>
                  <div className="main-list-title">Osta tuotteita</div>
                  <div className="main-list-content">
                    Tilaa vasaanotollesi Plackers-tuotteita messualennuksella
                  </div>
                </li>
              </Link>
              <Link to="/newsletter">
                <li>
                  <div className="main-list-title">Tilaa säkhköinen uutiskirje</div>
                  <div className="main-list-content">
                    Sinulle, joka haluat uusimmat tiedot Plackersin tuotteista
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
