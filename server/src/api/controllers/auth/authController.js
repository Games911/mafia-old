const mongoose = require('mongoose');
const createToken = require('../../services/auth/jwtService');
const {hashPassword, comparePassword} = require('../../services/auth/passwordService');
const User = require('../../../database/models/auth/User');

module.exports = {
    createUser: async (email, nikname, password) => {
        const passwordHash = await hashPassword(password);
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            nikname: nikname,
            password: passwordHash,
        });
        await user.save();
        return await createToken(user);
    },

    loginUser: async (nikname, password) => {
        const user = (await User.find({ nikname: nikname }).limit(1))[0];
        if (user && await comparePassword(password, user.password)) {
            return await createToken(user);
        }
        throw new Error('Wrong nikname or password');
    },
}
