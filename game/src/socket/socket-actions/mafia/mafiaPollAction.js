const gameController = require('../../controllers/game/gameController');
const socketHelper = require('../../helpers/socketHelper');

// mafia poll
const mafiaPollAction = {
    invoke: async (game, roundId, roomId, socket) => {
        game = await gameController.gameSetStatus(game._id, roundId, 'mafia-poll');
        game = await gameController.gameSetSpeaker(game._id, roundId, 1);

        for (const [index, value] of game.players.entries()) {
            if (index !== 0) {
                game = await gameController.gameNextSpeaker(game._id, roundId);
            }
            if (value.role !== 'Mafia') continue;

            socket.broadcast.emit('game-event', {roomId: roomId, game: game});
            await socketHelper.sleep(7000);
        }
    },
}

module.exports = mafiaPollAction;