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

        switch (round.status) {
            case 'alive':
                if (Number(round.speaker) === Number(userCountRoom)) {
                    await setRoundStatus(round, 'chat');
                } else {
                    await setNextRound(round);
                }
                break;
            case 'chat':
                if (Number(round.number) === 1) {
                    const newRound = await createRound(round.number + 1);
                    await updateGameRound(gameId, newRound);
                } else {
                    await setRoundStatus(round, 'mafia');
                }
                break;
            case 'mafia':
                const newRound = await createRound(round.number + 1);
                await updateGameRound(gameId, newRound);
                break;
        }

        const gameResult = await getGameById(gameId);
        console.log(gameResult);
        return {game: gameResult, processMessage: processMessage};
    },

}

module.exports = gameController;
