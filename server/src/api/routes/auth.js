var express = require('express');
var router = express.Router();

router.get('/signup', (req, res, next) => {
    res.status(200).json({
        message: 'Signup'
    });
});

module.exports = router;