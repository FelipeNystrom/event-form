const Router = require('express-promise-router');
const router = new Router();
const {
  addRowToNewsletter,
  addRowToAmbassador,
  addRowToBasicPkg
} = require('../spreadsheets');

router.get('/', (req, res) => {});

router.post('/newsletter', async (req, res) => {
  const { name, mail } = req.body;
  console.log(req.body);
  try {
    await addRowToNewsletter(name, mail);
    console.log('sucess inserting row to newsletter sheet');
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
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
    await addRowToAmbassador(
      clinicName,
      clinicAddress,
      contactFirstname,
      contactLastname,
      contactPhoneNumber,
      contactMail
    );
    console.log('sucess inserting row to ambassador sheet');
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: err });
  }
});

router.post('/pkg/basic', async (req, res) => {
  const {
    sample,
    address1,
    address2,
    phoneNumber,
    mail,
    zipCode,
    postalRegion,
    isBigClinic,
    wantNewsletter,
    contactFirstname,
    contactLastname
  } = req.body.cntPkg;

  console.log(req.body.cntPkg);

  try {
    await addRowToBasicPkg(
      sample,
      address1,
      address2,
      phoneNumber,
      mail,
      zipCode,
      postalRegion,
      isBigClinic,
      contactFirstname,
      contactLastname
    );
    console.log('sucess inserting row to basic package sheet');
    if (wantNewsletter === true) {
      const fullname = contactFirstname.concat(` ${contactLastname}`);
      await addRowToNewsletter(fullname, mail);
      console.log('sucess adding new subscriber to newsletter sheet');
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: err });
  }
});

router.post('/pkg/premium', (req, res) => {
  const {
    sample,
    address1,
    address2,
    phoneNumber,
    mail,
    zipCode,
    postalRegion,
    isBigClinic,
    wantNewsletter,
    contactFirstname,
    contactLastname,
    companyAddress1,
    companyAddress2,
    companyZipcode,
    companyPostalRegion,
    companyName
  } = req.body.cntPkg;

  try {
    await addRowToPremiumPkg(
      sample,
      address1,
      address2,
      phoneNumber,
      mail,
      zipCode,
      postalRegion,
      isBigClinic,
      contactFirstname,
      contactLastname,
      companyAddress1,
      companyAddress2,
      companyZipcode,
      companyPostalRegion,
      companyName
    );
    console.log('sucess inserting row to basic package sheet');
    if (wantNewsletter === true) {
      const fullname = contactFirstname.concat(` ${contactLastname}`);
      await addRowToNewsletter(fullname, mail);
      console.log('sucess adding new subscriber to newsletter sheet');
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: err });
  }

  
});

router.post('/pkg/platinum', (req, res) => {});

module.exports = router;
