const mongoose = require('mongoose');
const Room = require('../../../database/models/room/Room');

module.exports = {
    findAll: async () => {
        return Room.find({}).populate('users').populate('createdBy');
    },
};