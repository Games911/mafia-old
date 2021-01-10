const {createGame, getGameById} = require('../../repositories/game/gameRepository');
const {getRoundById, setNextRound} = require('../../repositories/game/roundRepository');
const { userCountRoom } = require('../../../config/settings');


const gameController = {
    startGame: async (room) => {
        try {
            return await createGame(room);
        } catch(error) {
            return null;
        }
    },

    gameNext: async (gameId, roundId) => {
        const round = await getRoundById(roundId);
        let processMessage = null;

        if (Number(round.speaker) === Number(userCountRoom)) {
            processMessage = 'Mafia time';
        } else {
            await setNextRound(round);
        }
        const gameResult = await getGameById(gameId);
        return {game: gameResult, processMessage: processMessage};
    },

}

module.exports = gameController;
