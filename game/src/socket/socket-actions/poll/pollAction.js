const gameController = require('../../controllers/game/gameController');
const socketHelper = require('../../helpers/socketHelper');

// poll for each player
const pollAction = {
    invoke: async (game, roundId, roomId, socket) => {
        game = await gameController.gameSetStatus(game._id, roundId, 'poll');
        game = await gameController.gameSetSpeaker(game._id, roundId, 1);

        for (const [index, value] of game.players.entries()) {
            if (index !== 0) {
                game = await gameController.gameNextSpeaker(game._id, roundId);
            }
            if (value.status === 'kill') continue;

            socket.broadcast.emit('game-event', {oomId: roomId, game: game, pollEvent: true});
            await socketHelper.sleep(3000);
        }
    },
}

module.exports = pollAction;