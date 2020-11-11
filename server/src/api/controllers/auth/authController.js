const mongoose = require('mongoose');
const createToken = require('../../services/auth/jwtService');
const hashPassword = require('../../services/auth/passwordService');
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
        try {
            await user.save();
            return await createToken(user);
        } catch (error) {
            throw error
        }
    },

    getUser: async (id) => {
        // ..
    },

    getAllUsers: async() => {
        // ...
    }
}
