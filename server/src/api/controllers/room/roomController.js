const mongoose = require('mongoose');
const Room = require('../../../database/models/room/Room');
const User = require('../../../database/models/auth/User');

module.exports = {
    createRoom: async (name, userId) => {
        const user = (await User.find({ _id: userId }).limit(1))[0];
        if (user) {
            const room = new Room({
                _id: new mongoose.Types.ObjectId(),
                name: name,
                status: 'free',
                players: [user],
                createdBy: [user],
            });
            await room.save();
            return room;
        } else {
            throw new Error('User doesn\'t exist');
        }
    },

    getRooms: async () => {
        return Room.find({}).populate('players').populate('createdBy');
    },
}
