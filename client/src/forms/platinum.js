import React, { Component, Fragment } from 'react';
import Checkbox from './Checkbox';
import Modal from './modal';
import './platinum.css';

class Platinum extends Component {
  state = {
    companyNameInput: '',
    contactMail: '',
    contactPhonenumberInput: '',
    addressCompanyInput1: '',
    addressCompanyInput2: '',
    zipCodeCompanyInput: '',
    regionCompanyInput: '',
    sellingToday: { string: '', state: false },
    otherInput: '',
    errorMsg: '',
    successMsg: '',
    redirect: false,
    refresh: false,
    next: false,
    show: false,
    acceptsTerms: false
  };

  componentDidUpdate() {
    const { redirect, refresh } = this.state;

    if (redirect) {
      setTimeout(() => {
        window.location.pathname = '/';
      }, 4500);
    }

    if (refresh) {
      setTimeout(() => {
        this.forceUpdate();
      }, 4500);
    }
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    const {
      companyNameInput,
      contactMail,
      contactPhonenumberInput,
      addressCompanyInput1,
      addressCompanyInput2,
      zipCodeCompanyInput,
      regionCompanyInput,
      sellingToday,
      otherInput,
      acceptsTerms
    } = this.state;
    if (acceptsTerms) {
      const pltnmPkg = {
        companyName: companyNameInput,
        contactMail: contactMail,
        contactPhonenumber: contactPhonenumberInput,
        addressCompanyInput1: addressCompanyInput1,
        addressCompanyInput2: addressCompanyInput2,
        zipCodeCompanyInput: zipCodeCompanyInput,
        regionCompanyInput: regionCompanyInput,
        sellingToday: sellingToday.string,
        otherInput: otherInput
      };

      const opts = {
        method: 'POST',
        body: JSON.stringify({ pltnmPkg }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      fetch(`api/pkg/platinum`, opts)
        .then(res => {
          if (res.status === 200) {
            this.setState({
              companyNameInput: '',
              contactMail: '',
              contactPhonenumberInput: '',
              addressCompanyInput1: '',
              addressCompanyInput2: '',
              zipCodeCompanyInput: '',
              regionCompanyInput: '',
              errorMsg: '',
              successMsg:
                'Tack för din anmälan! Vi kommer höra av oss så fort som möjligt!',
              redirect: true
            });
          }
        })
        .catch(err => {
          this.setState({
            companyNameInput: '',
            contactMail: '',
            contactPhonenumberInput: '',
            addressCompanyInput1: '',
            addressCompanyInput2: '',
            zipCodeCompanyInput: '',
            regionCompanyInput: '',
            errorMsg: 'Oj! Något har blivit fel. Prova att anmäla dig igen',
            successMsg: '',
            refresh: true
          });
        });
    } else {
      this.setState({
        errorMsg: 'Du måste godkänna villkoren för att forsätta'
      });
    }
  };

  handleNext = () => {
    this.setState({ next: true });
  };

  setSellingToday = (name, localState) => {
    const stateCopy = Object.assign({}, this.state.sellingToday);
    if (this.state.sellingToday.string === '') {
      this.setState({ sellingToday: { string: name, state: !localState } });
    }

    if (name !== stateCopy.string) {
      this.setState({ sellingToday: { string: name, state: !localState } });
    }
  };

  showModal = e => {
    e.preventDefault();
    this.setState({ show: true });
  };

  hideModal = acceptStatus => {
    this.setState({ show: false, acceptsTerms: acceptStatus }, () => {
      this.handleSubmit();
    });
  };

  render() {
    const {
      companyNameInput,
      contactMail,
      contactPhonenumberInput,
      addressCompanyInput1,
      addressCompanyInput2,
      zipCodeCompanyInput,
      regionCompanyInput,
      otherInput,
      next,
      errorMsg,
      successMsg,
      show
    } = this.state;
    return (
      <Fragment>
        {successMsg && <div className="success">{successMsg}</div>}
        {errorMsg && <div className="error">{errorMsg}</div>}
        <div className="section-title">Platinumpaket</div>
        <form className="platinum-form" onSubmit={this.handleSubmit}>
          <Modal hideModal={this.hideModal} show={show} />
          {!next ? (
            <Fragment>
              <div className="package-description">
                I vårt Platinumpaket skräddarsyr vi ett paket som passar era
                behov. Efter anmälan kommer vi kontakta er så snabbt som möjligt
                för att ta reda på hur vi kan ta fram lösningar speciella för
                era behov.
              </div>
              <input
                type="text"
                name="companyNameInput"
                onChange={this.handleChange}
                value={companyNameInput}
                placeholder="Namn på företag"
                required
              />
              <input
                type="email"
                name="contactMail"
                onChange={this.handleChange}
                value={contactMail}
                placeholder="Mailaddress vi kan kontakta"
                required
              />
              <input
                type="text"
                name="contactPhonenumberInput"
                onChange={this.handleChange}
                value={contactPhonenumberInput}
                placeholder="Telefonnummer vi kan ringa för kontakt"
                required
              />
              <input type="button" onClick={this.handleNext} value="Nästa" />
            </Fragment>
          ) : (
            <Fragment>
              <div className="next-title">Faktura information</div>
              <div className="basic-form-row">
                <input
                  type="text"
                  name="addressCompanyInput1"
                  onChange={this.handleChange}
                  value={addressCompanyInput1}
                  placeholder="Företagsaddress 1"
                  required
                />
                <input
                  type="text"
                  name="addressCompanyInput2"
                  onChange={this.handleChange}
                  value={addressCompanyInput2}
                  placeholder="Företagsaddress 2"
                />
              </div>
              <div className="basic-form-row">
                <input
                  type="text"
                  name="zipCodeCompanyInput"
                  onChange={this.handleChange}
                  value={zipCodeCompanyInput}
                  placeholder="Postnummer till ditt företag"
                />
                <input
                  type="text"
                  name="regionCompanyInput"
                  onChange={this.handleChange}
                  value={regionCompanyInput}
                  placeholder="Postort"
                />
              </div>
              <div className="selling-today">
                <div className="selling-today-title">
                  Vi säljer Plackers idag
                </div>
                <div className="options">
                  <label>
                    Vet ej
                    <Checkbox
                      changeParentState={this.setSellingToday}
                      nameOfBox="dontKnow"
                    />
                  </label>
                  <label>
                    Ja
                    <Checkbox
                      changeParentState={this.setSellingToday}
                      nameOfBox="yes"
                    />
                  </label>
                  <label>
                    Nej
                    <Checkbox
                      changeParentState={this.setSellingToday}
                      nameOfBox="no"
                    />
                  </label>
                  <label>
                    Nej – men kan tänka oss det
                    <Checkbox
                      changeParentState={this.setSellingToday}
                      nameOfBox="noBut"
                    />
                  </label>
                </div>
              </div>
              <textarea
                name="otherInput"
                value={otherInput}
                onChange={this.handleChange}
                placeholder="Övriga önskemål"
                cols="10"
                rows="6"
              />
              <input
                type="submit"
                onClick={this.showModal}
                value="Beställ prover"
              />
            </Fragment>
          )}
        </form>
      </Fragment>
    );
  }
}

export default Platinum;
