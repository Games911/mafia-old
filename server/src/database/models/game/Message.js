const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: {
        type: String,
        required: true,
        max: 250
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
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

module.exports = mongoose.model('Message', schema);