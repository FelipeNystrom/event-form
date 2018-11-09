import React, { Component, Fragment } from 'react';
import './buy.css';

class Buy extends Component {
  handleClick = e => {
    e.preventDefault();
    window.location.href = 'izettle://x-callback-url/payment/1.0';
  };
  render() {
    return (
      <Fragment>
        <div className="buy-container">
          <div className="buy-title">Köp Plackers produkter</div>
          <div className="buy-message">
            <div>
              Vi erbjuder 20% mässrabatt vid beställning av Plackers produkter
              till kliniken. Ta kontakt med vår mässpersonal för att göra en
              beställning.
            </div>
            <div>
              Vi har även tagit fram ett specialerbjudande med ännu högre rabatt
              och utan leveranskostnad för dig som köper på plats på mässan.
              Kontakta oss så hjälper vi dig.
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Buy;
