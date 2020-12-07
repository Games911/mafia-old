const mongoose = require('mongoose');
const Room = require('../../../database/models/room/Room');
const { userCountRoom } = require('../../../config/settings');

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
        if (room.status === 'busy') {
            throw new Error('Room is already busy');
        }
        const checkUser = room.players.filter(element => String(element._id) === String(user._id));
        if (checkUser.length === 0) {
            room.players.push(user);
            if (room.players.length === Number(userCountRoom)) {
                room.status = 'busy';
            }
            await room.updateOne(room);
        } else {
            throw new Error('User already exist in current room');
        }
        return room;
    },
    findAll: async () => {
        return Room.find({}).populate('players').populate('createdBy');
    },
    roomFindById: async (id) => {
        try {
            return (await Room.find({ _id: id }).populate('players').populate('createdBy').limit(1))[0];
        } catch (error) {
            throw new Error('User doesn\'t exist');
        }
    },
}