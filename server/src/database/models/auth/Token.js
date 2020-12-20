const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hash: {
        type: String,
        required: true,
        unique: true,
    },
    expired: {
        type: Date,
        required: true,
        default: Date.now
    },
}, {
    versionKey: false
});

module.exports = mongoose.model('Token', schema);