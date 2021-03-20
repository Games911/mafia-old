const Room = require('../../../database/models/room/Room');

module.exports = {
    findAll: async () => {
        return Room.find({}).populate('users').populate('createdBy');
    },

    getRoomById: async (roomId) => {
        const round = (await Room.find({ _id: roomId }).populate('users').populate('createdBy').limit(1))[0];
        if (typeof round !== 'undefined') {
            return round;
        }
        throw new Error('Room doesn\'t exist');
    },
};