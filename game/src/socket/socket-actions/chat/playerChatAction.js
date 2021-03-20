const gameController = require('../../controllers/game/gameController');
const socketHelper = require('../../helpers/socketHelper');

// send messages from each player
const playerChatAction = {
    invoke: async (game, roundId, roomId, socket) => {
        for (const [index, value] of game.players.entries()) {
            if (index !== 0) {
                game = await gameController.gameNextSpeaker(game._id, roundId);
            }
            if (value.status === 'kill') continue;
            socket.broadcast.emit('game-event', {roomId: roomId, game: game});
            await socketHelper.sleep(3000);
        }
    },
}

module.exports = playerChatAction;