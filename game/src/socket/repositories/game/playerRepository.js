const mongoose = require('mongoose');
const Player = require('../../../database/models/game/Player');

const playerRepository = {
    getPlayerById: async (playerId) => {
        const player = (await Player.find({ _id: playerId }).limit(1))[0];
        if (typeof player !== 'undefined') {
            return player;
        }
        throw new Error('Player doesn\'t exist');
    },
    setPlayerPoll: async (playerId) => {
        const player = await playerRepository.getPlayerById(playerId);
        player.poll = player.poll + 1;
        await player.updateOne(player);
    },
    setPollZero: async (playerId) => {
        const player = await playerRepository.getPlayerById(playerId);
        player.poll = 0;
        await player.updateOne(player);
    },
};

module.exports = playerRepository;
