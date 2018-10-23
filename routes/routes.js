const Router = require('express-promise-router');
const router = new Router();
const { addRowToNewsletter, addRowToAmbassador } = require('../spreadsheets');

router.get('/', (req, res) => {});

router.post('/newsletter', async (req, res) => {
  const { name, mail } = req.body;

  try {
    const result = await addRowToNewsletter(name, mail);
    res.send({
      msg: `a new row with name:${result.name} and email:${
        result.mail
      } has successfully been added!`
    });
  } catch (err) {
    res.status(500).send({ msg: err });
  }
});

router.post('/order', (req, res) => {});

router.post('/ambassador', async (req, res) => {
  const {
    clinicName,
    clinicAddress,
    contactFirstname,
    contactLastname,
    contactPhoneNumber,
    contactMail
  } = req.body;

  try {
    const result = await addRowToAmbassador(
      clinicName,
      clinicAddress,
      contactFirstname,
      contactLastname,
      contactPhoneNumber,
      contactMail
    );
    res.send({
      msg: `a new row with values: ${result.clinicname}, ${
        result.clinicaddress
      }, ${result.contactfirstname}, ${result.contactlastname}, ${
        result.contactphonenumber
      }, ${result.contactmail} has successfully been inserted!`
    });
  } catch (err) {
    res.status(500).send({ msg: err });
  }
});

module.exports = router;
