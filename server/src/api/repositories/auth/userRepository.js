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
        return (await User.find({ nikname: nikname }).limit(1))[0];
    },
    findById: async (id) => {
        return (await User.find({ _id: id }).limit(1))[0];
    },
}