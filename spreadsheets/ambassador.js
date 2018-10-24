const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const SPREADSHEET_ID = '1vczSUriAbFJfKNgUxU8K3JTRPlmPlPHZAfmKm9NeSjw';
const { NODE_ENV } = process.env;

let credentials;
if (NODE_ENV !== 'production') {
  credentials = require(`../service-account.json`);
} else {
  credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY
  };
}

module.exports = async (
  clinicName,
  clinicAddress,
  contactFirstname,
  contactLastname,
  contactPhoneNumber,
  contactMail
) => {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  console.log(credentials);
  await promisify(doc.useServiceAccountAuth)(credentials);
  const info = await promisify(doc.getInfo)();
  console.log(`Loaded doc: ` + info.title + ` by ` + info.author.email);
  const sheet = info.worksheets[0];
  console.log(
    `sheet 1: ` + sheet.title + ` ` + sheet.rowCount + `x` + sheet.colCount
  );

  const insertNewRow = {
    clinic_name: clinicName,
    clinic_address: clinicAddress,
    contact_firstname: contactFirstname,
    contact_lastname: contactLastname,
    contact_phone_number: contactPhoneNumber,
    contact_mail: contactMail
  };
  const insert = await promisify(sheet.addRow)(insertNewRow);
  return insert;
};
