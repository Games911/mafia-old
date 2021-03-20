const gameController = require('../../controllers/game/gameController');
const socketHelper = require('../../helpers/socketHelper');

// end poll
const pollEndAction = {
    invoke: async (game, roundId, roomId, killedPlayersArr, addPollResult, socket) => {
        game = await gameController.gameSetStatus(game._id, roundId, 'poll-end');
        socket.broadcast.emit('game-event', {roomId: roomId, game: game, addPollResult: addPollResult, killedPlayersArr: killedPlayersArr});
        await socketHelper.sleep(3000);
    },
}

module.exports = pollEndAction;