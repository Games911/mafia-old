const roundController = require('../../controllers/game/roundController');
const socketHelper = require('../../helpers/socketHelper');

const sendMessageAction = {
    invoke: async (game, roundId, playerId, textMessage, webSocketServer) => {
        const roundObjectMessage = await roundController.saveMessage(roundId, playerId, textMessage);
        const returnData = JSON.stringify({
            route: 'new-message',
            round: roundObjectMessage,
            game: game
        });
        await socketHelper.socketSender(webSocketServer, returnData);
    },
}

module.exports = sendMessageAction;