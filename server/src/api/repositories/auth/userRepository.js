const mongoose = require('mongoose');
const User = require('../../../database/models/auth/User');

module.exports = {
    createUser: async (email, nikname, passwordHash) => {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            nikname: nikname,
            password: passwordHash,
        });
        await user.save();
        return user;
    },

    findByNikname: async (nikname) => {
        const user = (await User.find({ nikname: nikname }).limit(1))[0];
        if (typeof user !== 'undefined') {
            return user;
        }
        throw new Error('User doesn\'t exist');
    },

    userFindById: async (id) => {
        const user = (await User.find({ _id: id }).limit(1))[0];
        if (typeof user !== 'undefined') {
            return user;
        }
        throw new Error('User doesn\'t exist');
    },

    updateUserWithToken: async (user, tokenEntry) => {
        user.token = tokenEntry;
        await user.updateOne(user);
    }
}