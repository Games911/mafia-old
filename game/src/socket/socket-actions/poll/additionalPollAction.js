const gameController = require('../../controllers/game/gameController');
const socketHelper = require('../../helpers/socketHelper');

// additional poll for each player
const additionalPollAction = {
    invoke: async (game, currentRound, roomId, killedPlayersArr, webSocketServer) => {
        game = await gameController.gameSetStatus(game._id, currentRound._id, 'poll-add');
        game = await gameController.gameSetSpeaker(game._id, currentRound._id, 1);

        for (const [index, value] of game.players.entries()) {
            if (index !== 0) {
                game = await gameController.gameNextSpeaker(game._id, currentRound._id);
            }
            if (value.status === 'kill') continue;

            const returnData = JSON.stringify({
                route: 'game-event',
                roomId: roomId,
                game: game,
                addPollArr: killedPlayersArr
            });
            await socketHelper.socketSender(webSocketServer, returnData);
            await socketHelper.sleep(3000);
        }
    },
}

module.exports = additionalPollAction;