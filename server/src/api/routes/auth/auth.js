const express = require('express');
const router = express.Router();
const userController = require('../../controllers/auth/authController');

router.post("/signup", async (req, res) => {
    try {
        const token = await userController.createUser(req.body.email, req.body.nikname, req.body.password);
        res.status(201).json({
            message: "Created successfully",
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