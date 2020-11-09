const mongoose = require('mongoose');
const User = require('../models/User');

const seedUser = async () => {

    User.remove({}, function(err,removed) {

    });

    const user1 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "user1@gmail.com",
        nikname: "user1",
        password: "123456",
    });

    const user2 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "user2@gmail.com",
        nikname: "user2",
        password: "123456",
    });

    const user3 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "user3@gmail.com",
        nikname: "user3",
        password: "123456",
    });

    const documents = [user1, user2, user3];

    try {
        return await User.create(documents);
    } catch (error) {
        throw error;
    }
};

module.exports = seedUser;