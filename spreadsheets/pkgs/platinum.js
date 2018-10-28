const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');

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

const SPREADSHEET_ID = '1tGFd5qpkCw4F55srLlPSuYVG4r7NQezf1fBgrVVtH1Y';
module.exports = async (
  companyName,
  contactMail,
  contactPhonenumber,
  addressCompanyInput1,
  addressCompanyInput2,
  zipCodeCompanyInput,
  regionCompanyInput
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
    companyname: companyName,
    contact_mail: contactMail,
    contact_phonenumber: contactPhonenumber,
    address_1: addressCompanyInput1,
    address_2: addressCompanyInput2,
    zipcode: zipCodeCompanyInput,
    postal_region: regionCompanyInput
  };
  const insert = await promisify(sheet.addRow)(insertNewRow);
  return insert;
};
