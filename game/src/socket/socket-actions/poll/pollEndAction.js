const gameController = require('../../controllers/game/gameController');
const socketHelper = require('../../helpers/socketHelper');

// end poll
const pollEndAction = {
    invoke: async (game, currentRound, roomId, killedPlayersArr, addPollResult, webSocketServer) => {
        game = await gameController.gameSetStatus(game._id, currentRound._id, 'poll-end');
        const returnData = JSON.stringify({
            route: 'game-event',
            roomId: roomId,
            game: game,
            addPollResult: addPollResult,
            killedPlayersArr: killedPlayersArr
        });
        await socketHelper.socketSender(webSocketServer, returnData);
        await socketHelper.sleep(3000);
    },
}

module.exports = pollEndAction;