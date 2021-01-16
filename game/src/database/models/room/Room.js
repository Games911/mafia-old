const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    status: {
        type: String,
        required: true,
        max: 20
    },
    users:[{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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

module.exports = mongoose.model('Room', schema);