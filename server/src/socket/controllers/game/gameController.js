const {createGame, getGameById, updateGameRound} = require('../../repositories/game/gameRepository');
const {getRoundById, setNextRound, setRoundStatus, createRound} = require('../../repositories/game/roundRepository');
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
            if (Number(round.number) === 1) {
                console.log(round.status);
                if (round.status === 'chat') {
                    const newRound = await createRound(round.number + 1);
                    await updateGameRound(gameId, newRound);
                } else {
                    await setRoundStatus(round, 'chat');
                }
            } else {
                await setRoundStatus(round, 'mafia');
            }
        } else {
            await setNextRound(round);
        }
        const gameResult = await getGameById(gameId);
        return {game: gameResult, processMessage: processMessage};
    },

}

module.exports = gameController;
