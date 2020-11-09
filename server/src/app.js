const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loginController = require('./api/controllers/loginController');
const authRoutes = require('./api/routes/auth');
const userRoutes = require('./api/routes/user');
const seedRoutes = require('./api/routes/seed');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async(req, res, next) => {
    const result = await loginController.login(req.body.name);
    res.status(200).json({
        message: result
    });
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/seed', seedRoutes);

module.exports = app;