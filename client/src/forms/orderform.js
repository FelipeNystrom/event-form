import React, { Component, Fragment } from 'react';
import Loading from '../loading';
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
    orderInfo: '',
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
      orderInfo
    } = this.state;

    const { premium } = this.props;

    const emailPattern = /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/;

    if (premium && orderInfo.length !== 0) {
    }
    if (
      nameOfRecipient.length !== 0 &&
      addressInput1.length !== 0 &&
      zipCodeInput.length !== 0 &&
      regionInput.length !== 0 &&
      nameInput.length !== 0 &&
      phoneNumberInput.length !== 0 &&
      mailInput.length !== 0 &&
      emailPattern.test(mailInput)
    ) {
      return true;
    } else {
      return false;
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
      regionInput,
      nameOfRecipient
    } = this.state;

    this.setState({
      addressCompanyInput1: addressInput1,
      addressCompanyInput2: addressInput2,
      zipCodeCompanyInput: zipCodeInput,
      regionCompanyInput: regionInput,
      companyNameInput: nameOfRecipient,
      disabled: true
    });
  };

  emptyAddress = () => {
    this.setState({
      addressCompanyInput1: '',
      addressCompanyInput2: '',
      zipCodeCompanyInput: '',
      regionCompanyInput: '',
      companyNameInput: '',
      disabled: false
    });
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
      acceptsTerms,
      orderInfo
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
        cntPkg['reference'] = reference;
        cntPkg['orderInfo'] = orderInfo;
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
              orderInfo: '',
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
              loading: false,
              otherInput: '',
              errorMsg: '',
              successMsg: 'Kiitos mielenkiinnostasi tuotteitamme kohtaan!',
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
            loading: false,
            errorMsg:
              'Oi! Jotain meni väärin. Pyydämme ystävällisesti kokeilemaan uudestaan.'
          });
        });
      this.setState({ loading: true });
    } else {
      this.setState({
        errorMsg: 'Hyväksy käyttöehdot jatkaaksesi eteenpäin'
      });
    }
  };

  handleSelect = e => {
    e.preventDefault();
    const { samples } = this.state;

    const copySamples = samples.slice();
    copySamples.forEach(sample => {
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
      next,
      loading,
      orderInfo
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
            <div className="section-title">Basic-näytepakkaus</div>
          ) : (
            <div className="section-title">Premium-pakkaus</div>
          )}
          <Fragment>
            {loading && <Loading />}
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
                          <div className="sample-row top">{displayRow1}</div>
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
                      {!basic && (
                        <div className="premium-order-info">
                          <div className="contact-column-title">Tilaus</div>
                          <div className="premium-order-sub-title">
                            Osta 100kpl 300kr, lle. vero
                          </div>
                          <input
                            type="text"
                            className="premium-order-text"
                            name="orderInfo"
                            onChange={this.handleChange}
                            value={orderInfo}
                            placeholder="Anna tilausmäärä (kpl.)"
                          />
                        </div>
                      )}
                      <div className="contact-column-title">Toimitustiedot</div>

                      <input
                        type="text"
                        name="nameOfRecipient"
                        onChange={this.handleChange}
                        value={nameOfRecipient}
                        placeholder="Vastaanottaja/Klinikka"
                        required
                      />
                      <input
                        type="text"
                        name="addressInput1"
                        onChange={this.handleChange}
                        value={addressInput1}
                        placeholder="Osoite 1"
                        required
                      />
                      <input
                        type="text"
                        name="addressInput2"
                        onChange={this.handleChange}
                        value={addressInput2}
                        placeholder="Osoite 2 (vapaaehtoinen)"
                      />
                      <input
                        type="text"
                        name="zipCodeInput"
                        onChange={this.handleChange}
                        value={zipCodeInput}
                        placeholder="Postinumero"
                        required
                      />
                      <input
                        type="text"
                        name="regionInput"
                        onChange={this.handleChange}
                        value={regionInput}
                        placeholder="Postitoimipaikka"
                        required
                      />
                      <div className="checkboxes-mini">
                        <div className="checkbox-section-wrapper">
                          <label>
                            Minulle saa lähettää näytteet Postin
                            toimipisteeseen.
                          </label>
                          <Checkbox
                            changeParentState={this.handleChangeChk}
                            nameOfBox="agent"
                          />
                        </div>
                      </div>
                      <div className="contact-column-title-sub">
                        yhteystiedot
                      </div>
                      <input
                        type="text"
                        name="nameInput"
                        onChange={this.handleChange}
                        value={nameInput}
                        placeholder="Etu- ja sukunimi"
                        required
                      />
                      <input
                        type="text"
                        name="phoneNumberInput"
                        onChange={this.handleChange}
                        value={phoneNumberInput}
                        placeholder="Puhelinnumero"
                        required
                      />
                      <input
                        type="email"
                        name="mailInput"
                        onChange={this.handleChange}
                        value={mailInput}
                        placeholder="Sähköpostiosoite"
                        pattern="/[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/"
                      />
                    </div>
                  </div>
                  {basic ? (
                    <Fragment>
                      <div className="checkboxes">
                        <label>
                          Olemme iso klinikka (enemmän kuin viisi
                          vastaanottohuonetta)
                        </label>
                        <Checkbox
                          changeParentState={this.handleChangeChk}
                          nameOfBox="bigClinic"
                        />
                        <label>
                          Tilaan mielelläni sähköisen Plackers-uutiskirjeen.
                        </label>
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
                        <label>
                          Tilaan mielelläni sähköisen Plackers-uutiskirjeen.
                        </label>
                        <Checkbox
                          changeParentState={this.handleChangeChk}
                          nameOfBox="newsletter"
                        />
                      </div>
                      <input
                        type="button"
                        onClick={this.nextPage}
                        value="Seuraava"
                      />
                    </Fragment>
                  )}
                </Fragment>
              ) : (
                <Fragment>
                  <div className="next-title">Laskutustiedot</div>
                  <div className="flex-row">
                    <div className="same-address">
                      <label>Sama kuin toimitusosoite</label>
                      <Checkbox
                        changeParentState={this.handleChangeChk}
                        nameOfBox="sameAddress"
                      />
                    </div>
                    <div className="selling-today">
                      <label>Myymme Plackersia tänään.</label>
                      <select
                        name="sellingToday"
                        value={sellingToday}
                        onChange={this.handleChange}
                      >
                        <option value="...">...</option>

                        <option value="Ja">Kyllä</option>
                        <option value="Nej">Ei</option>
                        <option value="Nej – men kan tänka oss det">
                          Ei- mutta voisin harkita sitä.
                        </option>
                        <option value="Vet ej">En osaa sanoa</option>
                      </select>
                    </div>
                  </div>
                  <div className="basic-form-row">
                    <input
                      type="text"
                      name="companyNameInput"
                      onChange={this.handleChange}
                      value={companyNameInput}
                      placeholder="Yrityksen nimi (vapaaehtoinen)"
                      disabled={disabled}
                    />
                    <input
                      type="text"
                      name="addressCompanyInput1"
                      onChange={this.handleChange}
                      value={addressCompanyInput1}
                      placeholder=" Laskutusosoite 1 (vapaaehtoinen)
"
                      disabled={disabled}
                    />
                    <input
                      type="text"
                      name="addressCompanyInput2"
                      onChange={this.handleChange}
                      value={addressCompanyInput2}
                      placeholder="Laskutusosoite 2 (vapaaehtoinen)
"
                      disabled={disabled}
                    />
                  </div>
                  <div className="basic-form-row">
                    <input
                      type="text"
                      name="zipCodeCompanyInput"
                      onChange={this.handleChange}
                      value={zipCodeCompanyInput}
                      placeholder="Postinumero (vapaaehtoinen)"
                      disabled={disabled}
                    />
                    <input
                      type="text"
                      name="regionCompanyInput"
                      onChange={this.handleChange}
                      value={regionCompanyInput}
                      placeholder="Postitoimipaikka
 (vapaaehtoinen)"
                      disabled={disabled}
                    />
                    <input
                      type="text"
                      name="reference"
                      onChange={this.handleChange}
                      value={reference}
                      placeholder="Viite (vapaaehtoinen)
"
                    />
                  </div>

                  <textarea
                    name="otherInput"
                    value={otherInput}
                    onChange={this.handleChange}
                    placeholder="Muut toiveet (vapaaehtoinen)"
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
        </Fragment>
      </Fragment>
    );
  }
}

export default Orderform;
