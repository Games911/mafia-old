const roundController = require('../../controllers/game/roundController');
const gameController = require('../../controllers/game/gameController');

const userPollAction = {
    invoke: async (gameId, roundId, playerId, roomId, socket) => {
        await roundController.userPoll(roundId, playerId);
        const game = await gameController.getGameById(gameId);
        socket.broadcast.emit('game-event', {roomId: roomId, game: game});
    },
}

module.exports = userPollAction;