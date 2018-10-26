const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const SPREADSHEET_ID = '1oAtfy2I1j7HAWKGV3WxtBV5F9xObIggCTVQeD_ATkYE';
const { NODE_ENV } = process.env;

let credentials;
if (NODE_ENV !== 'production') {
  credentials = require(`../../service-account.json`);
} else {
  credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY
  };
}

module.exports = async (
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
  companyName,
  otherInput
) => {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  await promisify(doc.useServiceAccountAuth)(credentials);
  const info = await promisify(doc.getInfo)();
  console.log(`Loaded doc: ` + info.title + ` by ` + info.author.email);
  const sheet = info.worksheets[0];
  console.log(
    `sheet 1: ` + sheet.title + ` ` + sheet.rowCount + `x` + sheet.colCount
  );

  const insertNewRow = {
    package_type: sample,
    adress1: address1,
    address2_optional: address2,
    phonenumber: phoneNumber,
    mail: mail,
    zipcode: zipCode,
    postal_region: postalRegion,
    is_big: isBigClinic,
    contact_person_firstname: contactFirstname,
    contact_person_lastname: contactLastname,
    companyAddress1: companyAddress1,
    companyAddress2_optional: companyAddress2,
    companyZipcode: companyZipcode,
    companyPostalRegion: companyPostalRegion,
    companyName: companyName,
    other: otherInput
  };
  const insert = await promisify(sheet.addRow)(insertNewRow);
  return insert;
};
