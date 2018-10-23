const express = require('express');
const server = express();
const _port = process.env.PORT || 3001;
const mountRoutes = require('./routes');

server.use(require('cors')());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

mountRoutes(server);

server.listen(_port, () => {
  console.log(`Api running on port ${_port}`);
});
