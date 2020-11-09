const mongoose = require('mongoose');
const createToken = require('../services/user/jwtService');
const User = require('../../database/models/User');

module.exports = {
    createUser: async (email, nikname, password) => {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            nikname: nikname,
            password: password,
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
