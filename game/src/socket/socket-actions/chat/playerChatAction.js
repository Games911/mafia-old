const gameController = require('../../controllers/game/gameController');
const socketHelper = require('../../helpers/socketHelper');

// send messages from each player
const playerChatAction = {
    invoke: async (game, currentRound, roomId, webSocketServer) => {
        for (const [index, value] of game.players.entries()) {
            if (index !== 0) {
                game = await gameController.gameNextSpeaker(game._id, currentRound._id);
            }
            if (value.status === 'kill') continue;

            const returnData = JSON.stringify({
                route: 'game-event',
                roomId: roomId,
                game: game,
            });
            await socketHelper.socketSender(webSocketServer, returnData);
            await socketHelper.sleep(3000);
        }
    },
}

module.exports = playerChatAction;