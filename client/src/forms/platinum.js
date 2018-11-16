import React, { Component, Fragment } from 'react';
import Loading from '../loading';
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
    recipientInput: '',
    sellingToday: '',
    otherInput: '',
    errorMsg: '',
    loading: false,
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
      recipientInput,
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
        recipientInput: recipientInput,
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
              loading: false,
              companyNameInput: '',
              contactMail: '',
              contactPhonenumberInput: '',
              addressCompanyInput1: '',
              addressCompanyInput2: '',
              zipCodeCompanyInput: '',
              regionCompanyInput: '',
              otherInput: '',
              errorMsg: '',
              successMsg:
                'Kiitos tilauksestasi! Otamme yhteyttä mahdollisimman pian.',
              redirect: true
            });
          }
        })
        .catch(err => {
          this.setState({
            loading: false,
            companyNameInput: '',
            contactMail: '',
            contactPhonenumberInput: '',
            addressCompanyInput1: '',
            addressCompanyInput2: '',
            zipCodeCompanyInput: '',
            regionCompanyInput: '',
            errorMsg: 'Oi! Tapahtui virhe. Kokeile ilmoittautumista uudestaan.',
            successMsg: '',
            refresh: true
          });
        });
      this.setState({ loading: true });
    } else {
      this.setState({
        errorMsg: 'Hyväksy käyttöehdot jatkaaksesi eteenpäin'
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
      contactPhonenumberInput
    } = this.state;

    const emailPattern = /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/;

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
      recipientInput,
      sellingToday,
      otherInput,
      next,
      errorMsg,
      successMsg,
      show,
      missingFields,
      loading
    } = this.state;
    return (
      <Fragment>
        {successMsg && <div className="success">{successMsg}</div>}
        {errorMsg && <div className="error">{errorMsg}</div>}
        <div className="section-title">Platinum-näytepakkaus</div>
        <form className="platinum-form" onSubmit={this.handleSubmit}>
          {loading && <Loading />}
          <Modal
            hideModal={this.hideModal}
            show={show}
            missingFields={missingFields}
          />
          {!next ? (
            <Fragment>
              <div className="package-description">
                Räätälöimme näytepakkauksen tarpeidenne mukaan. Tilauksen
                jälkeen otamme yhteyttä mahdollisimman pian, voidaksemme tarjota
                sopivan näytepaketin toiveidenne mukaisesti.
              </div>
              <input
                type="text"
                name="companyNameInput"
                onChange={this.handleChange}
                value={companyNameInput}
                placeholder="Yrityksen nimi"
                required
              />
              <input
                type="email"
                name="contactMail"
                onChange={this.handleChange}
                value={contactMail}
                placeholder="Sähköpostiosoite"
                pattern="/[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/"
              />
              <input
                type="text"
                name="contactPhonenumberInput"
                onChange={this.handleChange}
                value={contactPhonenumberInput}
                placeholder="Puhelinnumero"
                required
              />
              <input type="button" onClick={this.handleNext} value="Seuraava" />
            </Fragment>
          ) : (
            <Fragment>
              <div className="next-title">Laskutustiedot</div>
              <div className="basic-form-row">
                <input
                  type="text"
                  name="recipientInput"
                  onChange={this.handleChange}
                  value={recipientInput}
                  placeholder="Tilaaja (vapaaehtoinen)"
                />
                <input
                  type="text"
                  name="addressCompanyInput1"
                  onChange={this.handleChange}
                  value={addressCompanyInput1}
                  placeholder="Laskutusosoite 1 (vapaaehtoinen)"
                  required
                />
                <input
                  type="text"
                  name="addressCompanyInput2"
                  onChange={this.handleChange}
                  value={addressCompanyInput2}
                  placeholder="Laskutusosoite 2 (vapaaehtoinen)"
                />
              </div>
              <div className="basic-form-row">
                <input
                  type="text"
                  name="zipCodeCompanyInput"
                  onChange={this.handleChange}
                  value={zipCodeCompanyInput}
                  placeholder="Postinumero (vapaaehtoinen)"
                />
                <input
                  type="text"
                  name="regionCompanyInput"
                  onChange={this.handleChange}
                  value={regionCompanyInput}
                  placeholder="Postitoimipaikka"
                />
              </div>
              <div className="platinum-selling-today">
                <label>Myymme Plackersia tänään</label>
                <select
                  name="sellingToday"
                  value={sellingToday}
                  onChange={this.handleChange}
                >
                  <option value="...">...</option>

                  <option value="Ja">Kyllä</option>
                  <option value="Nej">Ei</option>
                  <option value="Nej – men kan tänka oss det">
                    Ei - mutta voisin harkita sitä
                  </option>
                  <option value="Vet ej">En osaa sanoa</option>
                </select>
              </div>

              <textarea
                name="otherInput"
                value={otherInput}
                onChange={this.handleChange}
                placeholder="Muut toiveet"
                cols="10"
                rows="6"
              />
              <input
                type="submit"
                onClick={this.showModal}
                value="Tilaa näytteitä"
              />
            </Fragment>
          )}
        </form>
      </Fragment>
    );
  }
}

export default Platinum;
