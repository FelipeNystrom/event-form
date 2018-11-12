import React, { Component, Fragment } from 'react';
import './modal.scss';

class Modal extends Component {
  state = {
    confirmed: false
  };

  handleClick = e => {
    e.preventDefault();

    const closeModal = () => {
      this.props.hideModal(this.state.confirmed);
    };

    if (e.target.name === 'yes') {
      this.setState({ confirmed: true }, closeModal);
    }
    if (e.target.name === 'no') {
      this.setState({ confirmed: false }, closeModal);
    }

    if (e.target.name === 'ok') {
      this.props.hideModal('ok');
    }
  };

  render() {
    const { show, missingFields } = this.props;
    const showHideClassName = show
      ? 'modal display-block'
      : 'modal display-none';
    return (
      <div className={showHideClassName}>
        <div className="modal-main">
          {missingFields ? (
            <Fragment>
              <div className="modal-title">
                <h5>Oj! Har du missat ett fält?</h5>
              </div>
              <div className="modal-message">
                Var vänlig fyll i alla fält innan du går vidare. Kontrollera
                även att mailadressen är korrekt ifylld.
              </div>
              <button name="ok" onClick={this.handleClick}>
                OK!
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <div className="modal-title">
                <h5>Integritetspolicy</h5>
              </div>
              <div className="modal-text">
                <ul>
                  <li>
                    1. Tietosuojakäytäntömme ja evästeet Plackers suojelee
                    yksityisyyttäsi EU:n General Data Protection Regulation
                    -tietosuoja-asetusta noudattaen. Tietosuojakäytäntömme
                    koskevat kaikkia kotisivuumme Plackers.fi liitettyjä
                    verkkosivuja ja lomakkeita. Plackers Scandinavia AB on
                    vastuussa verkkosivulla yhtiölle luovutettujen
                    henkilötietojen turvallisesta käsittelystä ja
                    taltioimisesta. Voit ottaa yhteyttä sähköpostilla
                    info@plackers.se, jos sinulla tulee kysyttävää
                    tietosuojakäyttännöstämme.
                  </li>
                  <li>
                    1.1 Käsittelemämme henkilötiedot Esimerkkejä keräämistämme
                    tiedoista: •Yrityksen nimi •Tilauksen kontaktihenkilön nimi
                    •Yrityksen osoite/laskutusosoite •Tilaajan puhelinnumero ja
                    sähköpostiosoite •Evästeitä verkkosivun käytöstä, kuten
                    esimerkiksi mitä hakusanoja tai alaotsikoita käytät,
                    hakukoneen asetuksia sekä käyttämäsi IP-osoite. Plackers ei
                    kerää henkilötietoja, kuten henkilötunnusta,
                    maksutapatietoja tai tietoja maksuvälineestä.
                  </li>
                  <li>
                    1.2 Miten keräämme tietoa? Plackers kerää tietoja
                    verkkosivuihin upotettujen toiminnallisten lomakkeiden
                    avulla. Yhteystietojen luovuttaminen on vapaaehtoista. Jos
                    valintasi on olla antamatta yhteystietojasi, voimme olla
                    estyneitä lähettämään teille tiettyjä tuotteitamme tai
                    tarjoamaan kaikkia palveluitamme. Esimerkkejä lomakkeista:
                    •Yhteystietolomake •Näytteiden tai tuotteiden tilauslomake
                    •Sähköisen uutiskirjeen tilauslomake
                  </li>
                  <li>
                    1.3 Tiedon keräämisen päämäärät: •Tiedot mahdollistavat
                    tuotteiden ja palveluiden tarkastelemisen ja tilaamisen
                    verkossa. •Voimme lähettää päivitettyjä tietoja
                    tuotteistamme. •Voimme jakaa sähköistä uutiskirjettämme ja
                    tietoa uusista tuotteistamme, kampanjoista sekä tarjouksista
                    •Voimme tarvittaessa ottaa yhteyttä teihin vastataksemme
                    kysymyksiinne ja/tai tarjota Plackersin tuotteita ja
                    palveluita. Plackers Scandinavia AB ei luovuta tietoja
                    kolmannelle osapuolelle eikä vastaanota tietoja kolmannelta
                    osapuolelta.
                  </li>
                  <li>
                    1.4 Oikeudellinen perusta henkilötietojen keräämiselle
                    •Tietoja luovuttaneen henkilön suostumus. •Sopimukset ja
                    yhteiset edut. •Intressivertailu.
                  </li>
                  <li>
                    1.5 Miten tietoja säilytetään? Verkkosivun lomakkeiden
                    avulla kerättyjä tietoja säilytetään verkkopalvelimella
                    yhdessä tilaustenkäsittelyjärjestelmän kanssa.
                  </li>
                  <li>
                    1.6 Miten poistan tietoni järjestelmästä? Henkilötiedot saa
                    poistettua järjestelmästämme ottamalla yhteyttä
                    asiakaspalveluumme.
                  </li>
                  <li>
                    1.7 Luovutetaanko tietojani kolmannelle osapuolelle?
                    Plackers Scandinavia AB ei luovuta henkilötietoja
                    kolmannelle osapuolelle, mutta Plackers voi käyttää
                    alihankkijoiden palveluita verkkosivujen päivittämiseen,
                    korjaamiseen ja tehtävienhallintaan. Alihankkijat ovat
                    tietosuojavaltuutettuja asiantuntijoita ja he voivat
                    käsitellä henkilötietoja Plackersin pyynnöstä.
                  </li>
                  <li>
                    1.8 Käyttäjäoikeudet Plackers Scandinavia AB verkkosivun,
                    Plackers.fi käyttäjänä sinulla on oikeus vaatia selvitystä
                    henkilötietojen käsittelystä. Käyttäjänä sinulla on myös
                    oikeus vaatia tietojen oikaisua, rajausta tai poistamista
                    henkilötietolakien mukaisesti. Tapauksissa joissa
                    henkilötietojen käsittely perustuu yhteiseen sopimukseen,
                    voit milloin tahansa vaatia sopimuksen purkamista. Jos koet,
                    että Plackers ei noudata käyttäjäoikeuksia tai
                    henkilötietolakeja, on sinulla oikeus ilmoittaa siitä
                    valvontaviranomaiselle. Yhteystiedot ilmoitusta varten
                    löytyvät osoitteesta: www.datainspektionen.se.
                  </li>
                  <div>
                    Kontakt Puhelinnumero +358 8 611 30 00 info@plackers.se
                    Plackers Scandinavia AB, Stockholmsvägen 70, 181 42
                    Stockholm
                  </div>
                </ul>
              </div>
              <div className="modal-title">Jag godkänner villkoren</div>
              <div className="modal-button-wrapper">
                <button name="yes" onClick={this.handleClick}>
                  Ja
                </button>
                <button name="no" onClick={this.handleClick}>
                  Nej
                </button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Modal;
