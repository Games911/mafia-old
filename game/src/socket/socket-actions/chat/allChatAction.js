const gameController = require('../../controllers/game/gameController');
const socketHelper = require('../../helpers/socketHelper');

// All chat
const allChatAction = {
    invoke: async (game, currentRound, roomId, webSocketServer) => {
        game = await gameController.gameSetStatus(game._id, currentRound._id, 'chat');
        const returnData = JSON.stringify({
            route: 'game-event',
            roomId: roomId,
            game: game,
        });
        await socketHelper.socketSender(webSocketServer, returnData);
        await socketHelper.sleep(4000);
    },
}

module.exports = allChatAction;