const mongoose = require('mongoose');
const hashPassword = require('../../api/services/auth/passwordService');
const User = require('../models/User');

const seedUser = async () => {

    User.remove({}, function(err,removed) {

    });

    const passwordHash = await hashPassword("123456");

    const user1 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "user1@gmail.com",
        nikname: "user1",
        password: passwordHash,
    });

    const user2 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "user2@gmail.com",
        nikname: "user2",
        password: passwordHash,
    });

    const user3 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "user3@gmail.com",
        nikname: "user3",
        password: passwordHash,
    });

    const documents = [user1, user2, user3];

    try {
        return await User.create(documents);
    } catch (error) {
        throw error;
    }
};

module.exports = seedUser;