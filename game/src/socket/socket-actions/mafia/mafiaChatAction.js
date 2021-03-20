const gameController = require('../../controllers/game/gameController');
const socketHelper = require('../../helpers/socketHelper');

// mafia chat
const mafiaChatAction = {
    invoke: async (game, roundId, roomId, socket) => {
        game = await gameController.gameSetStatus(game._id, roundId, 'mafia');
        socket.broadcast.emit('game-event', {roomId: roomId, game: game});
        await socketHelper.sleep(7000);
    },
}

module.exports = mafiaChatAction;