const mongoose = require('mongoose');
const {hashPassword} = require('../../api/services/auth/passwordService');
const Room = require('../models/room/Room');
const User = require('../models/auth/User');

const seedRoom = async () => {

    Room.remove({}, function() {

    });

    const passwordHash = await hashPassword("123456");

    const user4 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "user4@gmail.com",
        nikname: "user4",
        password: passwordHash,
    });

    const user5 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "user5@gmail.com",
        nikname: "user5",
        password: passwordHash,
    });

    const user6 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "user6@gmail.com",
        nikname: "user6",
        password: passwordHash,
    });

    const user7 = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "user7@gmail.com",
        nikname: "user7",
        password: passwordHash,
    });
    const documentsUser = [user4, user5, user6, user7];
    await User.create(documentsUser);


    const room1 = new Room({
        _id: new mongoose.Types.ObjectId(),
        name: 'Room1',
        status: 'free',
        users: [user4, user5],
        createdBy: [user4],
    });

    const room2 = new Room({
        _id: new mongoose.Types.ObjectId(),
        name: 'Room2',
        status: 'free',
        users: [user6, user7],
        createdBy: [user6],
    });

    const documentsRoom = [room1, room2];
    await Room.create(documentsRoom);

};

module.exports = seedRoom;