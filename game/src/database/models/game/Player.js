const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    number: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        max: 50,
        required: true,
    },
    status: {
        type: String,
        required: true,
        max: 50,
        default: 'alive',
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
}, {
    versionKey: false
});

module.exports = mongoose.model('Player', schema);