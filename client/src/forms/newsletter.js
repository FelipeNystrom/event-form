import React, { Component, Fragment } from 'react';
import './newsletter.css';
import Modal from './modal';
import Loading from '../loading';

class Newsletter extends Component {
  state = {
    newsletterInput: '',
    loading: false,
    subscribersNameInput: '',
    errorMsg: '',
    successMsg: '',
    redirect: false,
    refresh: false,
    acceptsTerms: false,
    show: false,
    missingFields: false
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
    const { newsletterInput, subscribersNameInput, acceptsTerms } = this.state;

    if (acceptsTerms) {
      const opts = {
        method: 'POST',
        body: JSON.stringify({
          name: subscribersNameInput,
          mail: newsletterInput
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      fetch(`/api/newsletter`, opts)
        .then(res => {
          if (res.status === 200) {
            this.setState({
              newsletterInput: '',
              subscribersNameInput: '',
              errorMsg: '',
              successMsg: 'Tack för din anmälan!',
              loading: false,
              redirect: true,
              refresh: false
            });
          }
        })
        .catch(err => {
          this.setState({
            newsletterInput: '',
            subscribersNameInput: '',
            errorMsg: 'Oj! Något har blivit fel. Prova att anmäla dig igen',
            loading: false,
            successMsg: '',
            redirect: false,
            refresh: true
          });
        });
      this.setState({ loading: true });
    } else {
      this.setState({
        errorMsg: 'Du måste godkänna villkoren för att forsätta'
      });
    }
  };
  allFields = () => {
    const { newsletterInput, subscribersNameInput } = this.state;
    const emailPattern = /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/;

    if (
      newsletterInput.length !== 0 &&
      subscribersNameInput.length !== 0 &&
      emailPattern.test(newsletterInput)
    ) {
      return true;
    }
    return false;
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

  render() {
    const {
      newsletterInput,
      subscribersNameInput,
      loading,
      errorMsg,
      successMsg,
      missingFields,
      show
    } = this.state;
    return (
      <Fragment>
        {loading && <Loading />}
        <Modal
          hideModal={this.hideModal}
          show={show}
          missingFields={missingFields}
        />
        {successMsg && <div className="success">{successMsg}</div>}
        {errorMsg && <div className="error">{errorMsg}</div>}
        <div className="section-title">
          Ilmoittaudu sähköisen Plackers-uutiskirjeen saajaksi
        </div>
        <form className="newsletter-form">
          <input
            type="text"
            name="subscribersNameInput"
            onChange={this.handleChange}
            value={subscribersNameInput}
            placeholder="Etu- ja sukunimi"
            required
          />
          <input
            type="email"
            name="newsletterInput"
            onChange={this.handleChange}
            value={newsletterInput}
            placeholder="Sähköpostiosoite"
            pattern="/[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/"
          />
          <input onClick={this.showModal} type="submit" value="Ilmoittaudu" />
        </form>
      </Fragment>
    );
  }
}

export default Newsletter;
