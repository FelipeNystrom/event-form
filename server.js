const express = require('express');
const server = express();
const path = require('path');
const _port = process.env.PORT || 3001;
const mountRoutes = require('./routes');

server.use(require('cors')());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

mountRoutes(server);

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, 'client/build')));
  // Anything that doesn't match the above, send back index.html
  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
} else {
  server.use(express.static(path.join(__dirname, 'public')));
}

server.listen(_port, () => {
  console.log(`Api running on port ${_port}`);
});
