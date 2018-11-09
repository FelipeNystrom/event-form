const Router = require('express-promise-router');
const router = new Router();
const {
  addRowToNewsletter,
  addRowToAmbassador,
  addRowToBasicPkg,
  addRowToPremiumPkg,
  addRowToPlatinumPkg
} = require('../spreadsheets');

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

router.post('/ambassador', async (req, res) => {
  const {
    clinicName,
    clinicAddress,
    contactName,
    contactPhoneNumber,
    contactMail
  } = req.body;

  try {
    await addRowToAmbassador(
      clinicName,
      clinicAddress,
      contactName,
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
    samples,
    recipient,
    address1,
    address2,
    phoneNumber,
    mail,
    zipCode,
    postalRegion,
    agent,
    isBigClinic,
    wantNewsletter,
    contactName,
    reference
  } = req.body.cntPkg;

  console.log(req.body.cntPkg);

  const samplesIds = samples.map(sample => {
    return sample.id;
  });

  try {
    await addRowToBasicPkg(
      samplesIds,
      recipient,
      address1,
      address2,
      phoneNumber,
      mail,
      zipCode,
      postalRegion,
      agent,
      isBigClinic,
      contactName
    );
    console.log('sucess inserting row to basic package sheet');
    if (wantNewsletter === true) {
      await addRowToNewsletter(contactName, mail);
      console.log('sucess adding new subscriber to newsletter sheet');
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: err });
  }
});

router.post('/pkg/premium', async (req, res) => {
  const {
    samples,
    recipient,
    address1,
    address2,
    phoneNumber,
    mail,
    zipCode,
    postalRegion,
    agent,
    isBigClinic,
    wantNewsletter,
    contactName,
    companyAddress1,
    companyAddress2,
    companyZipcode,
    companyPostalRegion,
    companyName,
    otherInput,
    sellingToday,
    reference
  } = req.body.cntPkg;

  const samplesIds = samples.map(sample => {
    return sample.id;
  });

  try {
    await addRowToPremiumPkg(
      samplesIds,
      recipient,
      address1,
      address2,
      phoneNumber,
      mail,
      zipCode,
      postalRegion,
      agent,
      isBigClinic,
      contactName,
      companyAddress1,
      companyAddress2,
      companyZipcode,
      companyPostalRegion,
      companyName,
      sellingToday,
      otherInput,
      reference
    );
    console.log('sucess inserting row to premium package sheet');
    if (wantNewsletter === true) {
      await addRowToNewsletter(contactName, mail);
      console.log('sucess adding new subscriber to newsletter sheet');
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: err });
  }
});

router.post('/pkg/platinum', async (req, res) => {
  const {
    companyName,
    contactMail,
    contactPhonenumber,
    addressCompanyInput1,
    addressCompanyInput2,
    zipCodeCompanyInput,
    regionCompanyInput,
    sellingToday,
    otherInput
  } = req.body.pltnmPkg;

  try {
    await addRowToPlatinumPkg(
      companyName,
      contactMail,
      contactPhonenumber,
      addressCompanyInput1,
      addressCompanyInput2,
      zipCodeCompanyInput,
      regionCompanyInput,
      sellingToday,
      otherInput
    );
    console.log('sucess inserting row to platinum package sheet');
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: err });
  }
});

module.exports = router;
