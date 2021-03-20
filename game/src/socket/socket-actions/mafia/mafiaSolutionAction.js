const roundController = require('../../controllers/game/roundController');
const gameController = require('../../controllers/game/gameController');

const mafiaSolutionAction = {
    invoke: async (gameId, roundId, playerId, roomId, socket) => {
        await roundController.userPoll(roundId, playerId);
        const gameMafia = await gameController.getGameById(gameId);
        socket.broadcast.emit('game-event', {roomId: roomId, game: gameMafia});
    },
}

module.exports = mafiaSolutionAction;