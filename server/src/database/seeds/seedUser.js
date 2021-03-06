const mongoose = require('mongoose');
const {hashPassword} = require('../../api/services/auth/passwordService');
const User = require('../models/auth/User');
const Token = require('../models/auth/Token');

const seedUser = async () => {
    User.remove({}, function() {

    });
    Token.remove({}, function() {

    });

    const passwordHash = await hashPassword("123");

    const token1 = new Token({
        _id: new mongoose.Types.ObjectId(),
        hash: 'sdadiwe9399uadj9jj3d9237nz27n29zn923n9nznz',
    });
    await Token.create(token1);

    const user1 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "user1@gmail.com",
        nikname: "user1",
        password: passwordHash,
        token: token1,
    });

    const user2 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "user2@gmail.com",
        nikname: "user2",
        password: passwordHash,
    });

    const user3 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "taras@gmail.com",
        nikname: "tt",
        password: passwordHash,
    });

    const user4 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "rr@gmail.com",
        nikname: "rr",
        password: passwordHash,
    });

    const user5 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "ee@gmail.com",
        nikname: "ee",
        password: passwordHash,
    });

    const documents = [user1, user2, user3, user4, user5];

    return await User.create(documents);
};

module.exports = seedUser;