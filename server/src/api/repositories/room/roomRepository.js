const mongoose = require('mongoose');
const Room = require('../../../database/models/room/Room');

module.exports = {
    createRoom: async (name, user) => {
        const room = new Room({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            status: 'free',
            players: [user],
            createdBy: [user],
        });
        await room.save();
        return room;
    },
    addUser: async (room, user) => {
        const checkUser = room.players.filter(element => String(element._id) === String(user._id));
        if (checkUser.length === 0) {
            room.players.push(user);
            await room.updateOne(room);
        }
        return room;
    },
    findAll: async () => {
        return Room.find({}).populate('players').populate('createdBy');
    },
    roomFindById: async (id) => {
        return (await Room.find({ _id: id }).populate('players').populate('createdBy').limit(1))[0];
    },
}