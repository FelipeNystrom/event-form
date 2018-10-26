const addRowToNewsletter = require('./newsletter');
const addRowToAmbassador = require('./ambassador');
const addRowToBasicPkg = require('./pkgs/basic');
const addRowToPremiumPkg = require('./pkgs/premium');
const addRowToPlatinumPkg = require('./pkgs/platinum');

module.exports = {
  addRowToPlatinumPkg,
  addRowToPremiumPkg,
  addRowToBasicPkg,
  addRowToNewsletter,
  addRowToAmbassador
};
