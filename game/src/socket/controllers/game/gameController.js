const {createGame, getGameById, updateGameRound} = require('../../repositories/game/gameRepository');
const {getRoundById, setNextSpeaker, setRoundStatus, createRound} = require('../../repositories/game/roundRepository');
const { userCountRoom } = require('../../../config/settings');


const gameController = {
    getGameById: async (gameId) => {
        return await getGameById(gameId);
    },

    startGame: async (room) => {
        try {
            return await createGame(room);
        } catch(error) {
            return null;
        }
    },

    gameNextSpeaker: async (gameId, roundId) => {
        const round = await getRoundById(roundId);
        await setNextSpeaker(round);
        return await getGameById(gameId);
    },

    gameNextRound: async (gameId, roundId) => {
        const round = await getRoundById(roundId);
        const newRound = await createRound(round.number + 1);
        return await updateGameRound(gameId, newRound);
    },

    gameSetStatus: async (gameId, roundId, status) => {
        const round = await getRoundById(roundId);
        await setRoundStatus(round, status);
        return await getGameById(gameId);
    },

    gameNext: async (gameId, roundId) => {
        const round = await getRoundById(roundId);
        let processMessage = null;

        switch (round.status) {
            case 'alive':
                if (Number(round.speaker) === Number(userCountRoom)) {
                    await setRoundStatus(round, 'chat');
                } else {
                    await setNextSpeaker(round);
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
