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
                Det verkar som att alla fält inte är ifyllda. Var vänlig fyll i
                alla fält innan du går vidare.
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
                    1.Integritetspolicy & Cookies Plackers värnar om din
                    personliga integritet. Denna integritetspolicy gäller för
                    samtliga webbsidor på plackers.se. Plackers Scandinavia AB
                    är ansvarig för behandlingen av personuppgifter som samlas
                    in på webbplatsen. Du kan alltid kontakta oss vid frågor
                    kring integritets- och dataskydd genom att skicka ett
                    e-postmeddelande till oss på info@plackers.se
                  </li>
                  <li>
                    1.1 Personuppgifter som behandlas Exempel på information som
                    inhämtas: •Företagsnamn •Kontaktperson
                    •Företagsadress/Postadress/fakturaadress •Telefonnummer och
                    e-postadress •Information om användningen av webbplatsen, i
                    form av bland annat vilka undersidor som besökt,
                    browserinställningar och IP-adress. Plackers samlar inte in
                    personupplysningar som personnummer eller upplysningar om
                    betalningsmedel.
                  </li>
                  <li>
                    1.2 Hur hämtar vi information? Plackers samlar in
                    upplysningar genom formulär på våra webbsidor. Det är
                    frivilligt att uppge denna information. Om du väljer att
                    inte uppge personuppgifter, kan vi vara förhindrade från att
                    ge dig tillgång till vissa produkter eller tjänster. Exempel
                    på formulär: •Kontaktformulär •När man önskar att prova
                    eller köpa en produkt eller tjänst •Vid anmälan att motta
                    våra nyhetsbrev per e-post
                  </li>
                  <li>
                    1.3 Ändamålet med information som inhämtas •För att kunna ge
                    tillgång till våra produkter och tjänster •För att kunna
                    sända relevant information •För att kunna sända
                    e-postutskick med produktnyheter, kampanjer och andra
                    erbjudanden. •För att kunna ta kontakt med dig för att svara
                    på frågor och/eller erbjuda våra produkter och tjänster Vi
                    inhämtar ingen information från tredje part.
                  </li>
                  <li>
                    1.5 Rättslig grund för insamling av personuppgifter
                    •Samtycke •Avtal •Intresseavvägning
                  </li>
                  <li>
                    1.6 Hur lagras informationen? Information som inhämtats
                    genom formulär på plackers.se lagras på webbservern samt i
                    system för orderhantering
                  </li>
                  <li>
                    1.7 Hur tas information bort? Personuppgifter tas bort efter
                    kundens kontakt med vår kundtjänst.
                  </li>
                  <li>
                    1.8 Utlämning av information till tredje part?
                    Personuppgifter delas inte ut till tredjepart, men Plackers
                    kan använda underleverantörer för att leverera hela eller
                    delar av webbplatsen samt för ärendebehandling. Sådana
                    underleverantörer är personuppgiftsbiträden och kan behandla
                    personuppgifter å Plackers vägnar.
                  </li>
                  <li>
                    1.9 Rättigheter Som användare av Plackers Scandinavia ABs
                    webbplats, plackers.se, har du rätt till att kräva insyn i
                    behandlingen av personuppgifter. Du kan också kräva
                    korrigeringar, begränsningar eller borttagande av
                    personuppgifter i enlighet med personuppgiftslagen. När
                    behandlingen av personuppgifter är baserad på samtycke, kan
                    du närsomhelst ta samtycket tillbaka. Om du tror att
                    Plackers inte har uppfyllt dina rättigheter enligt
                    personuppgiftslagen, har du rätt att överklaga till den
                    aktuella tillsynsmyndigheten. Detta görs genom att skicka
                    ett klagomål till Datainspektionen. Kontaktuppgifter finns
                    på: http://www.datainspektionen.se
                  </li>
                  <div>
                    Kontakt Telefon 08-611 30 00 info@plackers.se Plackers
                    Scandinavia AB, Stockholmsvägen 70, 181 42 Stockholm
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
