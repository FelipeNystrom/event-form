import React, { Component, Fragment } from 'react';
import './ambassador.css';
import Modal from './modal';

class Ambassador extends Component {
  state = {
    clinicNameInput: '',
    clinicAddressInput: '',
    contactFirstNameInput: '',
    contactLastNameInput: '',
    contactNumberInput: '',
    contactMailInput: '',
    succesMsg: '',
    errorMsg: '',
    redirect: false,
    refresh: false,
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
      clinicNameInput,
      clinicAddressInput,
      contactFirstNameInput,
      contactLastNameInput,
      contactNumberInput,
      contactMailInput,
      acceptsTerms
    } = this.state;

    if (acceptsTerms) {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clinicName: clinicNameInput,
          clinicAddress: clinicAddressInput,
          contactFirstname: contactFirstNameInput,
          contactLastname: contactLastNameInput,
          contactPhoneNumber: contactNumberInput,
          contactMail: contactMailInput
        })
      };

      fetch(`api/ambassador`, opts)
        .then(res => {
          if (res.status === 200) {
            this.setState({
              clinicNameInput: '',
              clinicAddressInput: '',
              contactFirstNameInput: '',
              contactLastNameInput: '',
              contactNumberInput: '',
              contactMailInput: '',
              succesMsg: 'Tack för att du vill vara vår ambassadör',
              redirect: true
            });
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({
            clinicNameInput: '',
            clinicAddressInput: '',
            contactFirstNameInput: '',
            contactLastNameInput: '',
            contactNumberInput: '',
            contactMailInput: '',
            errorMsg: 'err',
            refresh: true
          });
        });
    } else {
      this.setState({
        errorMsg: 'Du måste godkänna villkoren för att forsätta'
      });
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
      clinicNameInput,
      clinicAddressInput,
      contactFirstNameInput,
      contactLastNameInput,
      contactNumberInput,
      contactMailInput,
      succesMsg,
      errorMsg,
      show
    } = this.state;

    return (
      <Fragment>
        <Modal hideModal={this.hideModal} show={show} />
        {succesMsg && <div className="success">{succesMsg}</div>}
        {errorMsg && <div className="error">{errorMsg}</div>}
        <div className="section-title">
          Fyll i dina uppgifter för att bli ambassadör
        </div>
        <form className="ambassador-form" onSubmit={this.handleSubmit}>
          <div className="clinic">
            <div className="clinic-title">Uppgifter till klinken</div>

            <div className="ambassador-row">
              <input
                type="text"
                onChange={this.handleChange}
                value={clinicNameInput}
                name="clinicNameInput"
                placeholder="Namn på klinik"
                required
              />
              <input
                type="text"
                onChange={this.handleChange}
                name="clinicAddressInput"
                value={clinicAddressInput}
                placeholder="Besöksaddress"
                required
              />
            </div>
          </div>

          <div className="contact">
            <div className="contact-title">Kontaktperson</div>

            <div className="ambassador-row">
              <input
                type="text"
                onChange={this.handleChange}
                value={contactFirstNameInput}
                name="contactFirstNameInput"
                placeholder="Förnamn"
                required
              />

              <input
                type="text"
                value={contactLastNameInput}
                onChange={this.handleChange}
                name="contactLastNameInput"
                placeholder="Efternamn"
                required
              />
            </div>
            <div className="ambassador-row">
              <input
                type="text"
                onChange={this.handleChange}
                value={contactNumberInput}
                name="contactNumberInput"
                placeholder="Telefonnummer till kontaktperson"
                required
              />
              <input
                type="email"
                onChange={this.handleChange}
                value={contactMailInput}
                name="contactMailInput"
                placeholder="Mailaddress till kontakperson"
                required
              />
            </div>
          </div>

          <input
            onClick={this.showModal}
            className="ambassador-send"
            type="submit"
            value="Skicka"
          />
        </form>
      </Fragment>
    );
  }
}

export default Ambassador;
