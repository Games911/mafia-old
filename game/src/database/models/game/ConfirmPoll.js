const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    solution: {
        type: Number,
        default: 0,
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

module.exports = mongoose.model('ConfirmPoll', schema);