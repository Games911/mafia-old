const express = require('express');
const router = express.Router();
const seed = require('../../../database/seeds/seeder');


router.post("/", async (req, res) => {
    try {
        if (req.body.token === "9999") {
            await seed();
            res.status(201).json({
                message: "Seeded successfully",
            });
        } else {
            res.status(400).json({
                message: "Mistake token",
            });
        }

    } catch(error) {
        res.status(400).json({
            message: error.message,
            errors: error.errors
        });
    }
});

module.exports = router;