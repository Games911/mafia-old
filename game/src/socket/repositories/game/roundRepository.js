const mongoose = require('mongoose');
const Round = require('../../../database/models/game/Round');
const Message = require('../../../database/models/game/Message');

const roundRepository = {
    getRoundById: async (roundId) => {
        const round = (await Round.find({ _id: roundId }).populate('messages').limit(1))[0];
        if (typeof round !== 'undefined') {
            return round;
        }
        throw new Error('Round doesn\'t exist');
    },

    setNextSpeaker: async (round) => {
        round.speaker = round.speaker + 1;
        await round.updateOne(round);
    },
    setSpeaker: async (round, number) => {
        round.speaker = number;
        await round.updateOne(round);
    },

    setRoundStatus: async (round, status) => {
        round.status = status;
        await round.updateOne(round);
    },

    createRound: async (roundNumber) => {
        const round = new Round({
            _id: new mongoose.Types.ObjectId(),
            number: roundNumber
        });
        await round.save();
        return round;
    },

    saveMessage: async (round, player, messageText) => {
        const message = new Message({
            _id: new mongoose.Types.ObjectId(),
            text: messageText,
            player: player,
            type: 'normal',
        });
        await message.save();
        round.messages.push(message);
        await round.updateOne(round);

        return round;
    }
}

module.exports = roundRepository;