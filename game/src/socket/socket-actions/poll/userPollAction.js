const roundController = require('../../controllers/game/roundController');
const gameController = require('../../controllers/game/gameController');
const socketHelper = require('../../helpers/socketHelper');

const userPollAction = {
    invoke: async (gameId, roundId, playerId, roomId, webSocketServer) => {
        await roundController.userPoll(roundId, playerId);
        const game = await gameController.getGameById(gameId);
        const returnData = JSON.stringify({
            route: 'game-event',
            roomId: roomId,
            game: game
        });
        await socketHelper.socketSender(webSocketServer, returnData);
    },
}

module.exports = userPollAction;