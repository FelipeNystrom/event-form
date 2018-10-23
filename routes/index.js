const api = require('./routes');
module.exports = server => {
  server.use('/api', api);
};
