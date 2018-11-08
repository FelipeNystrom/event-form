import React, { Component, Fragment } from 'react';
import './orderform.scss';
import Sample from './sample';
import Checkbox from './Checkbox';
import Modal from './modal';

class Orderform extends Component {
  state = {
    samples: [
      { selected: true, id: 1 },
      { selected: false, id: 2 },
      { selected: false, id: 3 },
      { selected: false, id: 4 }
    ],
    addressInput1: '',
    addressInput2: '',
    phoneNumberInput: '',
    mailInput: '',
    zipCodeInput: '',
    regionInput: '',
    bigClinic: false,
    newsletter: true,
    agent: false,
    nameInput: '',
    addressCompanyInput1: '',
    addressCompanyInput2: '',
    zipCodeCompanyInput: '',
    regionCompanyInput: '',
    companyNameInput: '',
    nameOfRecipient: '',
    sellingToday: { string: '', state: false },
    otherInput: '',
    errorMsg: '',
    successMsg: '',
    redirect: false,
    refresh: false,
    show: false,
    acceptsTerms: false,
    next: false
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

  nextPage = e => {
    this.setState({ next: !this.state.next });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeChk = (nameOfState, localState) => {
    this.setState({ [nameOfState]: !localState });
  };

  setSellingToday = (name, localState) => {
    const stateCopy = [...this.state.sellingToday];
    if (this.state.sellingToday.string === '') {
      this.setState({ sellingToday: { string: name, state: localState } });
    }

    if (name !== stateCopy.string && stateCopy.state !== false) {
      this.setState({ sellingToday: { string: name, state: localState } });
    }
  };

  handleSubmit = () => {
    const { premium } = this.props;
    const {
      samples,
      addressInput1,
      addressInput2,
      phoneNumberInput,
      nameOfRecipient,
      mailInput,
      zipCodeInput,
      regionInput,
      bigClinic,
      newsletter,
      nameInput,
      addressCompanyInput1,
      addressCompanyInput2,
      zipCodeCompanyInput,
      regionCompanyInput,
      companyNameInput,
      sellingToday,
      otherInput,
      agent,
      acceptsTerms
    } = this.state;

    if (acceptsTerms) {
      const filteredSampleChoice = samples.filter(
        sample => sample.selected === true
      );

      let apiCall = `/api/pkg/basic`;

      const cntPkg = {
        samples: filteredSampleChoice,
        recipient: nameOfRecipient,
        address1: addressInput1,
        address2: addressInput2,
        phoneNumber: phoneNumberInput,
        mail: mailInput,
        zipCode: zipCodeInput,
        postalRegion: regionInput,
        agent: agent,
        isBigClinic: bigClinic,
        wantNewsletter: newsletter,
        contactName: nameInput
      };

      if (premium) {
        apiCall = `/api/pkg/premium`;

        cntPkg['companyAddress1'] = addressCompanyInput1;
        cntPkg['companyAddress2'] = addressCompanyInput2;
        cntPkg['companyZipcode'] = zipCodeCompanyInput;
        cntPkg['companyPostalRegion'] = regionCompanyInput;
        cntPkg['companyName'] = companyNameInput;
        cntPkg['otherInput'] = otherInput;
        cntPkg['sellingToday'] = sellingToday;
      }

      const opts = {
        method: 'POST',
        body: JSON.stringify({
          cntPkg
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      fetch(apiCall, opts)
        .then(res => {
          if (res.status === 200) {
            this.setState({
              samples: [
                { selected: true, id: 1 },
                { selected: false, id: 2 },
                { selected: false, id: 3 },
                { selected: false, id: 4 }
              ],
              addressInput1: '',
              addressInput2: '',
              phoneNumberInput: '',
              mailInput: '',
              zipCodeInput: '',
              regionInput: '',
              bigClinic: false,
              newsletter: true,
              nameInput: '',
              agent: false,
              addressCompanyInput1: '',
              addressCompanyInput2: '',
              zipCodeCompanyInput: '',
              regionCompanyInput: '',
              companyNameInput: '',
              successMsg: 'Tack för att du vill prova våra produkter!',
              redirect: true
            });
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({
            refresh: true,
            errorMsg: 'Oj! Något har blivit fel. Vänligen prova igen.'
          });
        });
    } else {
      this.setState({
        errorMsg: 'Du måste godkänna villkoren för att forsätta'
      });
    }
  };

  handleSelect = e => {
    e.preventDefault();
    const { samples } = this.state;

    const copySamples = samples.slice();
    copySamples.forEach(sample => {
      console.log(sample.id === parseInt(e.target.name, 10));
      if (sample.id === parseInt(e.target.name, 10)) {
        const oldValue = sample.selected;
        sample.selected = !oldValue;
      }
    });

    this.setState({ samples: [...copySamples] });
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

  sortToRows = (arr1, arr2, arr3) =>
    arr1.forEach((indexContent, idx) => {
      idx % 2 === 0 ? arr2.push(indexContent) : arr3.push(indexContent);
    });

  render() {
    const {
      samples,
      addressInput1,
      addressInput2,
      phoneNumberInput,
      mailInput,
      zipCodeInput,
      regionInput,
      nameInput,
      addressCompanyInput1,
      addressCompanyInput2,
      zipCodeCompanyInput,
      regionCompanyInput,
      companyNameInput,
      nameOfRecipient,
      otherInput,
      errorMsg,
      successMsg,
      show,
      next
    } = this.state;
    const { basic } = this.props;

    let row1 = [];
    let row2 = [];

    this.sortToRows(samples, row1, row2);

    const displayRow1 = row1.map(sample => {
      return (
        <Sample
          key={sample.id}
          name={sample.id}
          handleClick={this.handleSelect}
          selected={sample.selected}
        />
      );
    });
    const displayRow2 = row2.map(sample => {
      return (
        <Sample
          key={sample.id}
          name={sample.id}
          handleClick={this.handleSelect}
          selected={sample.selected}
        />
      );
    });
    return (
      <Fragment>
        {successMsg && <div className="success">{successMsg}</div>}
        {errorMsg && <div className="error">{errorMsg}</div>}

        <Fragment>
          {basic ? (
            <div className="section-title">Baspaktet</div>
          ) : (
            <div className="section-title">Premiumpaket</div>
          )}
          <Fragment>
            <Modal hideModal={this.hideModal} show={show} />
            <form className="basic-form">
              {!next ? (
                <Fragment>
                  <div className="form-content-wrapper">
                    <div className="sample-display">
                      {basic ? (
                        <Fragment>
                          <div className="sample-row">{displayRow1}</div>
                          <div className="sample-row">{displayRow2}</div>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <div className="sample-premium">
                            <img
                              src="https://via.placeholder.com/360"
                              alt="#"
                            />
                          </div>
                        </Fragment>
                      )}
                    </div>
                    <div className="contact-column">
                      <div className="contact-column-title">
                        Leveransuppgifter
                      </div>
                      <input
                        type="text"
                        name="nameOfRecipient"
                        onChange={this.handleChange}
                        value={nameOfRecipient}
                        placeholder="Mottagare/Klinik"
                        required
                      />
                      <input
                        type="text"
                        name="addressInput1"
                        onChange={this.handleChange}
                        value={addressInput1}
                        placeholder="Address 1"
                        required
                      />
                      <input
                        type="text"
                        name="addressInput2"
                        onChange={this.handleChange}
                        value={addressInput2}
                        placeholder="Address 2"
                      />
                      <input
                        type="text"
                        name="zipCodeInput"
                        onChange={this.handleChange}
                        value={zipCodeInput}
                        placeholder="Postnummer"
                        required
                      />
                      <input
                        type="text"
                        name="regionInput"
                        onChange={this.handleChange}
                        value={regionInput}
                        placeholder="Postort"
                        required
                      />
                      <div className="checkboxes-mini">
                        <div className="checkbox-section-wrapper">
                          <label>Kan få leverans via postombud</label>
                          <Checkbox
                            changeParentState={this.handleChangeChk}
                            nameOfBox="agent"
                          />
                        </div>
                      </div>
                      <div className="contact-column-title-sub">
                        Kontaktuppgifter
                      </div>
                      <input
                        type="text"
                        name="nameInput"
                        onChange={this.handleChange}
                        value={nameInput}
                        placeholder="Namn"
                        required
                      />
                      <input
                        type="text"
                        name="phoneNumberInput"
                        onChange={this.handleChange}
                        value={phoneNumberInput}
                        placeholder="Telefonummer"
                        required
                      />
                      <input
                        type="email"
                        name="mailInput"
                        onChange={this.handleChange}
                        value={mailInput}
                        placeholder="Email"
                        required
                      />
                    </div>
                  </div>
                  {basic ? (
                    <Fragment>
                      <div className="checkboxes">
                        <label>
                          Vi är en stor klinik (fler än fem behandlingsrum)
                        </label>
                        <Checkbox
                          changeParentState={this.handleChangeChk}
                          nameOfBox="bigClinic"
                        />
                        <label>Vi vill gärna ha Plackers nyhetsbrev</label>
                        <Checkbox
                          changeParentState={this.handleChangeChk}
                          nameOfBox="newsletter"
                        />
                      </div>

                      <input
                        onClick={this.showModal}
                        type="submit"
                        value="Beställ prover"
                      />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <div className="checkboxes">
                        <label>Vi vill gärna ha Plackers nyhetsbrev</label>
                        <Checkbox
                          changeParentState={this.handleChangeChk}
                          nameOfBox="newsletter"
                        />
                      </div>
                      <input
                        type="button"
                        onClick={this.nextPage}
                        value="Nästa"
                      />
                    </Fragment>
                  )}
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
                      required
                    />
                    <input
                      type="text"
                      name="regionCompanyInput"
                      onChange={this.handleChange}
                      value={regionCompanyInput}
                      placeholder="Postort"
                      required
                    />
                    <input
                      type="text"
                      name="companyNameInput"
                      onChange={this.handleChange}
                      value={companyNameInput}
                      placeholder="Företagets namn"
                      required
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
                          sellingToday
                        />
                      </label>
                      <label>
                        Ja
                        <Checkbox
                          changeParentState={this.setSellingToday}
                          nameOfBox="yes"
                          sellingToday
                        />
                      </label>
                      <label>
                        Nej
                        <Checkbox
                          changeParentState={this.setSellingToday}
                          nameOfBox="no"
                          sellingToday
                        />
                      </label>
                      <label>
                        Nej – men kan tänka oss det
                        <Checkbox
                          changeParentState={this.setSellingToday}
                          nameOfBox="noBut"
                          sellingToday
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
        </Fragment>
      </Fragment>
    );
  }
}

export default Orderform;
