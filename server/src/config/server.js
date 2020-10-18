'use strict';

const express = require('express');
const { port, host } = require('./config');

// App
const server = express();
server.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(port, host);