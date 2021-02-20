const {createGame, getGameById, updateGameRound, setNullPoll} = require('../../repositories/game/gameRepository');
const {getRoundById, setNextSpeaker, setSpeaker, setRoundStatus, createRound} = require('../../repositories/game/roundRepository');
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
    gameSetSpeaker: async (gameId, roundId, number) => {
        const round = await getRoundById(roundId);
        await setSpeaker(round, number);
        return await getGameById(gameId);
    },

    gameNextRound: async (gameId, roundId) => {
        await setNullPoll(gameId);
        const round = await getRoundById(roundId);
        const newRound = await createRound(round.number + 1);
        return await updateGameRound(gameId, newRound);
    },

    gameSetStatus: async (gameId, roundId, status) => {
        const round = await getRoundById(roundId);
        await setRoundStatus(round, status);
        return await getGameById(gameId);
    },

    getAditionalPoll: async (players) => {
        let result = [];
        players.forEach((player) => {
            if (result.length === 1) {
                if (result[0].poll < player.poll) {
                    result = [];
                    result.push(player);
                } else if (result[0].poll === player.poll) {
                    result.push(player);
                }
            } else if (result.length > 1) {
                if (result[0].poll < player.poll) {
                    result = [];
                    result.push(player);
                } else if (result[0].poll === player.poll) {
                    result.push(player);
                }
            } else if (result.length === 0) {
                result.push(player);
            }
        });
        return result;
    }

}

module.exports = gameController;
