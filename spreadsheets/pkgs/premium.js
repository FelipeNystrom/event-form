const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const { SPREADSHEET_ID_PREMIUM, NODE_ENV } = process.env;

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
  reference,
  orderInfo
) => {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID_PREMIUM);
  await promisify(doc.useServiceAccountAuth)(credentials);
  const info = await promisify(doc.getInfo)();
  console.log(`Loaded doc: ` + info.title + ` by ` + info.author.email);
  const sheet = info.worksheets[0];
  console.log(
    `sheet 1: ` + sheet.title + ` ` + sheet.rowCount + `x` + sheet.colCount
  );

  const insertNewRow = {
    amount_to_order: orderInfo,
    recipient: recipient,
    adress1: address1,
    address2_optional: address2,
    phonenumber: phoneNumber,
    mail: mail,
    zipcode: zipCode,
    postal_region: postalRegion,
    agent: agent,
    is_big: isBigClinic,
    contact_person_name: contactName,
    company_address1: companyAddress1,
    company_address2_optional: companyAddress2,
    company_zipcode: companyZipcode,
    company_postal_region: companyPostalRegion,
    company_name: companyName,
    selling_today: sellingToday,
    other: otherInput,
    reference: reference
  };
  const insert = await promisify(sheet.addRow)(insertNewRow);
  return insert;
};
