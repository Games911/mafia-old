const gameController = require('../../controllers/game/gameController');
const socketHelper = require('../../helpers/socketHelper');

// All chat
const allChatAction = {
    invoke: async (game, roundId, roomId, socket) => {
        game = await gameController.gameSetStatus(game._id, roundId, 'chat');
        socket.broadcast.emit('game-event', {roomId: roomId, game: game});
        await socketHelper.sleep(4000);
    },
}

module.exports = allChatAction;