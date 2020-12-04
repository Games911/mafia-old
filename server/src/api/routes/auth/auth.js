const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/authController');

router.post("/signup", async (req, res) => {
    try {
        const signupObject = await authController.createUser(req.body.email, req.body.nikname, req.body.password);
        res.status(201).json({
            message: "Created successfully",
            token: signupObject.token,
            userId: signupObject.userId,
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const token = await authController.loginUser(req.body.nikname, req.body.password);
        res.status(200).json({
            message: "Logined successfully",
            token: token
        });
    } catch(error) {
        res.status(400).json({
            message: error.message,
            errors: error.errors
        });
    }
});

module.exports = router;