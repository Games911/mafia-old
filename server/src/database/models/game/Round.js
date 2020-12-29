const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    number: {
        type: Number,
        required: true,
        default: 1
    },
    status: {
        type: String,
        required: true,
        max: 50,
        default: 'alive'
    },
    speaker: {
        type: Number,
        required: true,
        default: 1
    },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    out: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
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

module.exports = mongoose.model('Round', schema);