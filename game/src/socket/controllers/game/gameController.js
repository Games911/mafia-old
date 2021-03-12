const {createGame, getGameById, updateGameRound, setNullPoll, createAddPoll} = require('../../repositories/game/gameRepository');
const {getRoundById, setNextSpeaker, setSpeaker, setRoundStatus, createRound} = require('../../repositories/game/roundRepository');
const {killPlayer, setPollZero} = require('../../repositories/game/playerRepository');


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

    getPollResult: async (players) => {
        let result = [];
        players.forEach((player) => {
            if (result.length === 1) {
                if (result[0].poll < player.poll) {
                    result = [];
                    result.push(player);
                } else if (player.poll !== 0 && result[0].poll === player.poll) {
                    result.push(player);
                }
            } else if (result.length > 1) {
                if (result[0].poll < player.poll) {
                    result = [];
                    result.push(player);
                } else if (player.poll !== 0 && result[0].poll === player.poll) {
                    result.push(player);
                }
            } else if (player.poll !== 0 && result.length === 0) {
                result.push(player);
            }
        });
        return result;
    },

    killPlayers: async (killedPlayersArr) => {
        for (const player of killedPlayersArr) {
            await killPlayer(player._id);
        }
    },

    setPollZero: async (gameId) => {
        const game = await getGameById(gameId);
        for (const player of game.players) {
            await setPollZero(player._id);
        }
    },

    createAddPoll: async (gameId, value) => {
        await createAddPoll(gameId, value);
    },

    resolveAddPoll: async (gameId, killedPlayersArr) => {
        const game = await getGameById(gameId);

        let alive = 0;
        let kill = 0;
        for (const confPoll of game.confirmPoll) {
            if (confPoll.solution === 0) {
                alive++;
            }
            if (confPoll.solution === 1) {
                kill++;
            }
        }
        if (alive === kill || alive > kill) {
            return false;
        } else {
            for (const player of killedPlayersArr) {
                await killPlayer(player._id);
            }
            return true;
        }
    },

}

module.exports = gameController;
