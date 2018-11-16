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
          <div className="buy-title">Osta Plackerin tuotteet</div>
          <div className="buy-message">
            <div>
              Tarjoamme edullisia messutarjouksia, kun tilaatte
              Plackers-tuotteita messuosastoltamme. Ota yhteyttä
              henkilökuntaamme messuosastollamme tilauksen tekemiseksi.
            </div>
            <div>
              Tarjoamme entistä edullisempia messutarjouksia ilman
              lähetyskuluja, kun tilaatte Plackers-tuotteita messuosastoltamme.
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Buy;
