const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const SPREADSHEET_ID = '14Ir2N45tHjyIVjYuAYrhIzNE_F7Yd_6yTVNz_yMYUgY';
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
  contactFirstname,
  contactLastname
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
    package_type: samplesIds,
    recipient: recipient,
    adress1: address1,
    address2_optional: address2,
    phonenumber: phoneNumber,
    mail: mail,
    zipcode: zipCode,
    postal_region: postalRegion,
    agent: agent,
    is_big: isBigClinic,
    contact_person_firstname: contactFirstname,
    contact_person_lastname: contactLastname
  };
  const insert = await promisify(sheet.addRow)(insertNewRow);
  return insert;
};
