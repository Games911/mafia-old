var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.post("/create", async (req, res, next) => {
    try {
        const user = await userController.createUser(req.body.email, req.body.nikname, req.body.password);
        res.status(201).json({
            message: "Created successfully",
            user
        });
    } catch(error) {
        res.status(400).json({
            message: error.message,
            errors: error.errors
        });
    }
});

module.exports = router;