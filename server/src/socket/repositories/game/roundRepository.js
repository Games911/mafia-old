const mongoose = require('mongoose');
const Round = require('../../../database/models/game/Round');


module.exports = {
    getRoundById: async (roundId) => {
        const round = (await Round.find({ _id: roundId }).limit(1))[0];
        if (typeof round !== 'undefined') {
            return round;
        }
        throw new Error('Round doesn\'t exist');
    },

    setNextRound: async (round) => {
        round.speaker = round.speaker + 1;
        await round.updateOne(round);
    }
};