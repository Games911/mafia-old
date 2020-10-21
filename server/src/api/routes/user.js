var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.post("/create", async (req, res, next) => {
    const user = await userController.createUser(req.body.email, req.body.name, req.body.password);
    res.status(201).json({
        message: "Created successfully",
        user
    })
});

module.exports = router;