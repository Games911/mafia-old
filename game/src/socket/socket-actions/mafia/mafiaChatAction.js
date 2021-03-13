const gameController = require('../../controllers/game/gameController');
const socketHelper = require('../../helpers/socketHelper');

// mafia chat
const mafiaChatAction = {
    invoke: async (game, currentRound, roomId, webSocketServer) => {
        //if (i !== 1) {
        game = await gameController.gameSetStatus(game._id, currentRound._id, 'mafia');
        const returnData = JSON.stringify({
            route: 'game-event',
            roomId: roomId,
            game: game,
        });
        await socketHelper.socketSender(webSocketServer, returnData);
        await socketHelper.sleep(7000);
        //}
    },
}

module.exports = mafiaChatAction;