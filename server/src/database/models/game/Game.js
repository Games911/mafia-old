const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },
    status: {
        type: String,
        required: true,
        max: 20,
        default: 'alive'
    },
    result: {
        type: String,
        max: 100
    },
    players:[{ type: Schema.Types.ObjectId, ref: 'Player' }],
    rounds:[{ type: Schema.Types.ObjectId, ref: 'Round' }],
    confirmPoll:[{ type: Schema.Types.ObjectId, ref: 'ConfirmPoll' }],
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

module.exports = mongoose.model('Game', schema);