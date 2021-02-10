const mongoose = require('mongoose');
const Player = require('../../../database/models/game/Player');


module.exports = {
    getPlayerById: async (playerId) => {
        const player = (await Player.find({ _id: playerId }).limit(1))[0];
        if (typeof player !== 'undefined') {
            return player;
        }
        throw new Error('Player doesn\'t exist');
    }
};

