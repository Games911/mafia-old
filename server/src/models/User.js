const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        max: 100
    },
    nikname: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        max: 100
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated: {
        type: Date,
        required: true,
        default: Date.now
    },
});

userSchema.path('email').validate(function (email) {
    console.log(email);
    var emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailRegex.test(email);
}, 'Incorrect email value.')

module.exports = mongoose.model('User', userSchema);