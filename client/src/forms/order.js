import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './order.scss';
class Order extends Component {
  render() {
    const { match } = this.props;
    return (
      <Fragment>
        <div className="section-title">Valitse yksi näytepaketeista</div>
        <div className="order-packages">
          <Link className="package" to={`${match.url}/basic`}>
            <div className="package-content">
              <div className="package-title">Basic</div>
              <div className="package-title-secondary">
                (Ilmaiseksi messuilta)
              </div>
              <ul className="package-specifics">
                <li>
                  Basic-pakkaus koostuu yksittäispakatuista näytteistä,
                  suositeltavaksi potilaille
                </li>
              </ul>
            </div>
            <form className="package-select">
              <input type="button" name="basic" value="Valitse" />
            </form>
          </Link>
          <Link className="package" to={`${match.url}/premium`}>
            <div className="package-content">
              <div className="package-title">Premium</div>
              <div className="package-title-secondary">(Alennettu hinta)</div>
              <ul className="package-specifics">
                <li>
                  Aloituspakkaus, jossa on lajitelma Plackers- näytteitä ja
                  onjeita ennaltaehkäisevään suunhoitoon. Pakkaus on nätillä
                  messuosastollamme.
                </li>
              </ul>
            </div>
            <form className="package-select">
              <input type="button" name="premium" value="Valitse" />
            </form>
          </Link>
          <Link className="package" to={`${match.url}/platinum`}>
            <div className="package-content">
              <div className="package-title">Platinum</div>
              <div className="package-title-secondary">(Alennettu hint)</div>
              <ul className="package-specifics">
                <li>
                  Räätälöimme näytepaketin toivedenne ja tarpedinne mukaisesti.
                </li>
              </ul>
            </div>
            <form className="package-select">
              <input type="button" name="platinum" value="Valitse" />
            </form>
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default Order;
