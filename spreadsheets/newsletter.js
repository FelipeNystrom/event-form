const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');

const credentials = require(`../service-account.json`);

const SPREADSHEET_ID = '1OJfON6coSq2sxAEut-3WmW2fptmZaJdQWM9BWPakw4I';
module.exports = async (name, mail) => {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  await promisify(doc.useServiceAccountAuth)(credentials);
  const info = await promisify(doc.getInfo)();
  console.log(`Loaded doc: ` + info.title + ` by ` + info.author.email);
  const sheet = info.worksheets[0];
  console.log(
    `sheet 1: ` + sheet.title + ` ` + sheet.rowCount + `x` + sheet.colCount
  );

  const insertNewRow = {
    name: name,
    mail: mail
  };
  const insert = await promisify(sheet.addRow)(insertNewRow);
  return insert;
};
