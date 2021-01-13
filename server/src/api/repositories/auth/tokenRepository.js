const mongoose = require('mongoose');
const Token = require('../../../database/models/auth/Token');

module.exports = {
    createTokenEntry: async (tokenHash) => {
        const token = new Token({
            _id: new mongoose.Types.ObjectId(),
            hash: tokenHash
        });
        await token.save();
        return token;
    },

    removeTokenEntry: async (id) => {
        await Token.findByIdAndRemove(id);
    }
}