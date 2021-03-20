const gameController = require('../../controllers/game/gameController');

const userAdditionalPollAction = {
    invoke: async (gameId, value, roomId, socket) => {
        const gameAddPoll = await gameController.getGameById(gameId);
        await gameController.createAddPoll(gameAddPoll._id, value);
        socket.broadcast.emit('game-event', {roomId: roomId, game: gameAddPoll});
    },
}

module.exports = userAdditionalPollAction;