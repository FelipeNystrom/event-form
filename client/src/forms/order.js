import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './order.css';
class Order extends Component {
  render() {
    const { match } = this.props;
    return (
      <Fragment>
        <div className="section-title">Välj något av våra provpaket</div>
        <div className="order-packages">
          <Link className="package" to={`${match.url}/basic`}>
            <div className="package-content">
              <div className="package-title">Basic</div>
              <ul className="package-specifics">
                <li>
                  Vårt baspaket består av olika enstycksprover för att
                  rekommendera Plackers till patienterna.
                </li>
              </ul>
            </div>
            <form className="package-select">
              <input type="button" name="basic" value="Välj" />
            </form>
          </Link>
          <Link className="package" to={`${match.url}/premium`}>
            <div className="package-content">
              <div className="package-title">Premium</div>
              <ul className="package-specifics">
                <li>
                  Vårt startpaket som kombinerar Plackers-prover med
                  rekommendationer kring förebyggande munhälsa. Samma paket som
                  vi visar upp i mässmontern.
                </li>
              </ul>
            </div>
            <form className="package-select">
              <input type="button" name="premium" value="Välj" />
            </form>
          </Link>
          <Link className="package" to={`${match.url}/platinum`}>
            <div className="package-content">
              <div className="package-title">Platinum</div>
              <ul className="package-specifics">
                <li>
                  Vårt erbjudande där vi skräddarsyr och anpassar ett
                  provkoncept enligt era önskemål.
                </li>
              </ul>
            </div>
            <form className="package-select">
              <input type="button" name="platinum" value="Välj" />
            </form>
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default Order;
