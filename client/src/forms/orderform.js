import React, { Component, Fragment } from 'react';
import './orderform.scss';
import Sample from './sample';
import Checkbox from './Checkbox';
import Modal from './modal';
import premiumPkg from '../assets/Plackers_iPad.png';
import pkg1 from '../assets/pkg1.jpg';
import pkg2 from '../assets/pkg2.jpg';
import pkg3 from '../assets/pkg3.jpg';
import pkg4 from '../assets/pkg4.jpg';

class Orderform extends Component {
  state = {
    samples: [
      { selected: true, id: 1, src: pkg1 },
      { selected: false, id: 2, src: pkg2 },
      { selected: false, id: 3, src: pkg3 },
      { selected: false, id: 4, src: pkg4 }
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
    sellingToday: '...',
    reference: '',
    sameAddress: false,
    missingFields: false,
    otherInput: '',
    errorMsg: '',
    successMsg: '',
    redirect: false,
    disabled: false,
    refresh: false,
    show: false,
    acceptsTerms: false,
    next: false
  };

  componentDidUpdate(_, prevState) {
    const { redirect, refresh, sameAddress } = this.state;

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
    console.log(!prevState.sameAddress && sameAddress);
    if (!prevState.sameAddress && sameAddress) {
      this.sameAddress();
    }

    if (prevState.sameAddress && !sameAddress) {
      this.emptyAddress();
    }
  }

  allFields = () => {
    const {
      nameOfRecipient,
      addressInput1,
      zipCodeInput,
      regionInput,
      nameInput,
      phoneNumberInput,
      mailInput,
      next,
      companyNameInput
    } = this.state;
    if(!next){
      if (
        (nameOfRecipient.length ||
          addressInput1.length ||
          zipCodeInput.length ||
          regionInput.length ||
          nameInput.length ||
          phoneNumberInput.length ||
          mailInput.length) === 0
      ) {
        return false;
      } 
    }


    if (next) {
      console.log(companyNameInput.length === 0);
      if (companyNameInput.length === 0) {
        return false;
      } else {
        return true;
      }
    }

  };

  nextPage = e => {
    e.preventDefault();
    if (this.allFields()) {
      this.setState({ next: !this.state.next });
    } else {
      this.setState({ show: true, missingFields: true });
    }

    return;
  };

  handleChange = e => {
    e.preventDefault();
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeChk = (nameOfState, localState) => {
    this.setState({ [nameOfState]: !localState });
  };

  sameAddress = () => {
    const {
      addressInput1,
      addressInput2,
      zipCodeInput,
      regionInput
    } = this.state;

    this.setState(
      {
        addressCompanyInput1: addressInput1,
        addressCompanyInput2: addressInput2,
        zipCodeCompanyInput: zipCodeInput,
        regionCompanyInput: regionInput,
        disabled: true
      },
      console.log
    );
  };

  emptyAddress = () => {
    this.setState(
      {
        addressCompanyInput1: '',
        addressCompanyInput2: '',
        zipCodeCompanyInput: '',
        regionCompanyInput: '',
        disabled: false
      },
      console.log
    );
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
      reference,
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
    const { basic } = this.props;
    if (!basic && !this.allFields()) {
      return this.setState({ show: true, missingFields: true });
    }

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
        contactName: nameInput,
        
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
        cntPkg['reference'] = reference;
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
              agent: false,
              nameInput: '',
              addressCompanyInput1: '',
              addressCompanyInput2: '',
              zipCodeCompanyInput: '',
              regionCompanyInput: '',
              companyNameInput: '',
              nameOfRecipient: '',
              sellingToday: '...',
              sameAddress: false,
              missingFields: false,
              otherInput: '',
              errorMsg: '',
              successMsg: 'Tack för att du vill prova våra produkter!',
              redirect: true,
              disabled: false,
              refresh: false,
              show: false,
              acceptsTerms: false,
              next: false
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
      sellingToday,
      missingFields,
      companyNameInput,
      nameOfRecipient,
      otherInput,
      errorMsg,
      successMsg,
      disabled,
      reference,
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
          src={sample.src}
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
          src={sample.src}
        />
      );
    });
    return (
      <Fragment>
        {successMsg && <div className="success">{successMsg}</div>}
        {errorMsg && <div className="error">{errorMsg}</div>}

        <Fragment>
          {basic ? (
            <div className="section-title">Baspaketet</div>
          ) : (
            <div className="section-title">Premiumpaket</div>
          )}
          <Fragment>
            <Modal
              hideModal={this.hideModal}
              show={show}
              missingFields={missingFields}
            />
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
                            <img src={premiumPkg} alt="#" />
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
                        placeholder="Address 2 (frivilligt)"
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
                  <div className="flex-row">
                    <div className="same-address">
                      <label>Samma adress som leveransadress</label>
                      <Checkbox
                        changeParentState={this.handleChangeChk}
                        nameOfBox="sameAddress"
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
                  </div>
                  <div className="basic-form-row">
                    <input
                      type="text"
                      name="addressCompanyInput1"
                      onChange={this.handleChange}
                      value={addressCompanyInput1}
                      placeholder="Företagsaddress 1 (frivilligt)"
                      disabled={disabled}
                    />
                    <input
                      type="text"
                      name="addressCompanyInput2"
                      onChange={this.handleChange}
                      value={addressCompanyInput2}
                      placeholder="Företagsaddress 2 (frivilligt)"
                      disabled={disabled}
                    />
                    <input
                      type="text"
                      name="zipCodeCompanyInput"
                      onChange={this.handleChange}
                      value={zipCodeCompanyInput}
                      placeholder="Postnummer (frivilligt)"
                      disabled={disabled}
                    />
                  </div>
                  <div className="basic-form-row">
                    
                    <input
                      type="text"
                      name="regionCompanyInput"
                      onChange={this.handleChange}
                      value={regionCompanyInput}
                      placeholder="Postort (frivilligt)"
                      disabled={disabled}
                    />
                    <input
                      type="text"
                      name="reference"
                      onChange={this.handleChange}
                      value={reference}
                      placeholder="Referens (frivilligt)"
                    />
                    <input
                      type="text"
                      name="companyNameInput"
                      onChange={this.handleChange}
                      value={companyNameInput}
                      placeholder="Företagets namn"
                    />
                  </div>

                  <textarea
                    name="otherInput"
                    value={otherInput}
                    onChange={this.handleChange}
                    placeholder="Övriga önskemål (frivilligt)"
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
