const gameController = require('../../controllers/game/gameController');
const socketHelper = require('../../helpers/socketHelper');

const userAdditionalPollAction = {
    invoke: async (gameId, value, roomId, webSocketServer) => {
        const gameAddPoll = await gameController.getGameById(gameId);
        await gameController.createAddPoll(gameAddPoll._id, value);
        const returnData = JSON.stringify({
            route: 'game-event',
            roomId: roomId,
            game: gameAddPoll
        });
        await socketHelper.socketSender(webSocketServer, returnData);
    },
}

module.exports = userAdditionalPollAction;