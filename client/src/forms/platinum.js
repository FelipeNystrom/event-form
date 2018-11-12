import React, { Component, Fragment } from 'react';
import Modal from './modal';
import './platinum.scss';

class Platinum extends Component {
  state = {
    companyNameInput: '',
    contactMail: '',
    contactPhonenumberInput: '',
    addressCompanyInput1: '',
    addressCompanyInput2: '',
    zipCodeCompanyInput: '',
    regionCompanyInput: '',
    sellingToday: '',
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

    if (!this.allFields()) {
      return this.setState({ show: true, missingFields: true });
    }

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

      fetch(`/api/pkg/platinum`, opts)
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
    if (this.allFields()) {
      this.setState({ next: true });
    } else {
      this.setState({ show: true, missingFields: true });
    }
    return;
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

  allFields = () => {
    const {
      companyNameInput,
      contactMail,
      contactPhonenumberInput,
      addressCompanyInput1,
      zipCodeCompanyInput,
      regionCompanyInput,
      next
    } = this.state;

    const emailPattern = /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/;

    if (next) {
      if (
        addressCompanyInput1.length !== 0 &&
        zipCodeCompanyInput.length !== 0 &&
        regionCompanyInput.length !== 0
      ) {
        return true;
      }
    }
    if (
      companyNameInput.length !== 0 &&
      contactMail.length !== 0 &&
      contactPhonenumberInput.length !== 0 &&
      emailPattern.test(contactMail)
    ) {
      return true;
    } else {
      return false;
    }
  };
  showModal = e => {
    e.preventDefault();

    if (this.allFields()) {
      this.setState({ show: true });
    } else {
      this.setState({ show: true, missingFields: true });
    }
  };

  hideModal = acceptStatus => {
    if (acceptStatus === 'ok') {
      return this.setState({ show: false, missingFields: false });
    }

    this.setState(
      { show: false, missingFields: false, acceptsTerms: acceptStatus },
      () => {
        this.handleSubmit();
      }
    );
  };

  handleChangeChk = (nameOfState, localState) => {
    this.setState({ [nameOfState]: !localState });
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
      sellingToday,
      otherInput,
      next,
      errorMsg,
      successMsg,
      show,
      missingFields
    } = this.state;
    return (
      <Fragment>
        {successMsg && <div className="success">{successMsg}</div>}
        {errorMsg && <div className="error">{errorMsg}</div>}
        <div className="section-title">Platinumpaket</div>
        <form className="platinum-form" onSubmit={this.handleSubmit}>
          <Modal
            hideModal={this.hideModal}
            show={show}
            missingFields={missingFields}
          />
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
                placeholder="Email"
                pattern="/[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/"
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
                  placeholder="Fakturadress 1"
                  required
                />
                <input
                  type="text"
                  name="addressCompanyInput2"
                  onChange={this.handleChange}
                  value={addressCompanyInput2}
                  placeholder="Fakturadress 2"
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
                <label>Vi säljer Plackers idag</label>
                <select
                  name="sellingToday"
                  value={sellingToday}
                  onChange={this.handleChange}
                >
                  <option value="Ja">...</option>

                  <option value="Ja">Ja</option>
                  <option value="Nej">Nej</option>
                  <option value="Nej – men kan tänka oss det">
                    Nej – men kan tänka oss det
                  </option>
                  <option value="Vet ej">Vet ej</option>
                </select>
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
