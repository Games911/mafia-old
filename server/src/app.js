const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const homeController = require('./api/controllers/homeController');
const authRoutes = require('./api/routes/auth/auth');
const seedRoutes = require('./api/routes/system/seed');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async(req, res, next) => {
    const result = await homeController.index(req.body.name);
    res.status(200).json({
        message: result
    });
});

app.use('/auth', authRoutes);
app.use('/seed', seedRoutes);

module.exports = app;