const mongoose = require('mongoose');
const Room = require('../../../database/models/room/Room');
const { userCountRoom } = require('../../../config/settings');

module.exports = {
    createRoom: async (name, user) => {
        const checkUserGlobal = await globalUserCheck(user);
        if (checkUserGlobal.length > 0) {
            throw new Error('You can\'t create new room until go out from your current room');
        }

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
        const issetUserRoom = room.players.filter(element => String(element._id) === String(user._id));
        if (issetUserRoom.length > 0) {
            return room;
        }

        if (room.status === 'busy') {
            throw new Error('Room is already busy');
        }

        const checkUserGlobal = await globalUserCheck(user);
        if (checkUserGlobal.length === 0) {
            room.players.push(user);
            if (room.players.length === Number(userCountRoom)) {
                room.status = 'busy';
            }
            await room.updateOne(room);
        } else {
            throw new Error('You can\'t enter this room until go out from your current room');
        }
        return room;
    },

    outUser: async (room, user) => {
        const newPlayers = room.players.filter(element => String(element._id) !== String(user._id));
        room.players = newPlayers;
        if (newPlayers.length < Number(userCountRoom)) {
            room.status = 'free';
        }
        await room.updateOne(room);
        return room;
    },

    findAll: async () => {
        return Room.find({}).populate('players').populate('createdBy');
    },

    roomFindById: async (id) => {
        const room = (await Room.find({ _id: id }).populate('players').populate('createdBy').limit(1))[0];
        if (typeof room !== 'undefined') {
            return room;
        }
        throw new Error('Room doesn\'t exist');
    },

    isBusyUser: async (user) => {
        const globalCheck = await globalUserCheck(user);
        return (globalCheck.length > 0);
    },
}

let globalUserCheck = async (user) => {
    const rooms = await Room.find({}).populate('players').populate('createdBy');
    return rooms.filter(room => room.players.filter(player => String(player._id) === String(user._id)).length > 0);
}