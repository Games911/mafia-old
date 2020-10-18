'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const server = express();
server.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);