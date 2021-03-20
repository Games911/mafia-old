const roundController = require('../../controllers/game/roundController');

const sendMessageAction = {
    invoke: async (game, roundId, playerId, textMessage, socket) => {
        const roundObjectMessage = await roundController.saveMessage(roundId, playerId, textMessage);
        socket.broadcast.emit('new-message', {round: roundObjectMessage, game: game});
    },
}

module.exports = sendMessageAction;