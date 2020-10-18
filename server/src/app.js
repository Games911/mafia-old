const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/init');
const loginController = require('./api/controllers/loginController');

//routes
const authRoutes = require('./api/routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(config.cors);

app.get('/', async(req, res, next) => {
    const author = await loginController.login(req.body.name)
    res.status(200).json({
        message: author
    });
});

app.use('/auth', authRoutes);

module.exports = app;