const mongoose = require('mongoose');
const User = require('../models/User');

const seedUser = async () => {
    const user1 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "user1@gmail.com",
        nikname: "user1",
        password: "123",
    });
    try {
        return await user1.save();
    } catch (error) {
        throw error;
    }
};

module.exports = seedUser;