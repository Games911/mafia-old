const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const homeController = require('./api/controllers/homeController');
const authRoutes = require('./api/routes/auth/auth');
const seedRoutes = require('./api/routes/system/seed');
const roomRoutes = require('./api/routes/room/room');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', async(req, res) => {
    const result = await homeController.index(req.body.name);
    res.status(200).json({
        message: result
    });
});

app.use('/auth', authRoutes);
app.use('/seed', seedRoutes);
app.use('/room', roomRoutes);

module.exports = app;