const {saveMessage, getRoundById} = require('../../repositories/game/roundRepository');
const {getPlayerById, setPlayerPoll} = require('../../repositories/game/playerRepository');


const roundController = {
    saveMessage: async (roundId, playerId, messageText) => {
        try {
            const round = await getRoundById(roundId);
            const player = await getPlayerById(playerId);
            return await saveMessage(round, player, messageText);
        } catch(error) {
            return null;
        }
    },
    userPoll: async (roundId, playerId) => {
        await setPlayerPoll(playerId);
        return await getRoundById(roundId);
    },
    getCurrentRound: async (game) => {
        return game.rounds.slice(-1)[0];
    }
}

module.exports = roundController;
