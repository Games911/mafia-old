const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const homeController = require('./api/controllers/homeController');
const authController = require('./api/controllers/auth/authController');
const authRoutes = require('./api/routes/auth/auth');
const seedRoutes = require('./api/routes/system/seed');
const roomRoutes = require('./api/routes/room/room');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, x-requested-with, Content-Type, Accept, Authorization");
    next();
});
// Cors

// Auth Middleware
app.use(async (req, res, next) => {
    const roomUrl = req.url.substring(0, 5);
    if (roomUrl === '/room' && String(req.method) !== 'OPTIONS') {
        const authToken = req.header('authorization');
        const token = String(authToken).substring(7);
        const result = await authController.checkToken(token);
        if (!result) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
    }
    next();
});
// Auth Middleware

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