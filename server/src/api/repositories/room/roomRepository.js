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
    findAll: async () => {
        return Room.find({}).populate('players').populate('createdBy');
    },
}