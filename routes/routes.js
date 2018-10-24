const Router = require('express-promise-router');
const router = new Router();
const { addRowToNewsletter, addRowToAmbassador } = require('../spreadsheets');

router.get('/', (req, res) => {});

router.post('/newsletter', async (req, res) => {
  const { name, mail } = req.body;
  console.log(req.body);
  try {
    const result = await addRowToNewsletter(name, mail);
    console.log(result);
    res.sendStatus(200);
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
    console.log(
      `msg: a new row with values: ${result.clinicname}, ${
        result.clinicaddress
      }, ${result.contactfirstname}, ${result.contactlastname}, ${
        result.contactphonenumber
      }, ${result.contactmail} has successfully been inserted!`
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({ msg: err });
  }
});

module.exports = router;
