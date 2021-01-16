const {saveMessage, getRoundById} = require('../../repositories/game/roundRepository');
const {getPlayerById} = require('../../repositories/game/playerRepository');


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
}

module.exports = roundController;
