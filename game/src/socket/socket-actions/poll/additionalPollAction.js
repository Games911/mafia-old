const gameController = require('../../controllers/game/gameController');
const socketHelper = require('../../helpers/socketHelper');

// additional poll for each player
const additionalPollAction = {
    invoke: async (game, roundId, roomId, killedPlayersArr, socket) => {
        game = await gameController.gameSetStatus(game._id, roundId, 'poll-add');
        game = await gameController.gameSetSpeaker(game._id, roundId, 1);

        for (const [index, value] of game.players.entries()) {
            if (index !== 0) {
                game = await gameController.gameNextSpeaker(game._id, roundId);
            }
            if (value.status === 'kill') continue;

            const returnData = JSON.stringify({
                route: 'game-event',
                roomId: roomId,
                game: game,
                addPollArr: killedPlayersArr
            });

            socket.broadcast.emit('game-event', {roomId: roomId, game: game, addPollArr: killedPlayersArr});
            await socketHelper.sleep(3000);
        }
    },
}

module.exports = additionalPollAction;