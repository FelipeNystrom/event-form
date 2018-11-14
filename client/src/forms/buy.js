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
              Tarjoamme edullisia messutarjouksia, kun tilaatte
              Plackers-tuotteita messuosastoltamme. Ota yhteyttä
              henkilökuntaamme messuosastollamme tilauksen tekemiseksi.
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
