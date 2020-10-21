const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/init');
const loginController = require('./api/controllers/loginController');
const authRoutes = require('./api/routes/auth');
const userRoutes = require('./api/routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(config.cors);

app.get('/', async(req, res, next) => {
    const result = await loginController.login(req.body.name);
    console.log(result);
    res.status(200).json({
        message: result
    });
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

module.exports = app;