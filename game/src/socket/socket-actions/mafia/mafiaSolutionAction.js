const roundController = require('../../controllers/game/roundController');
const gameController = require('../../controllers/game/gameController');
const socketHelper = require('../../helpers/socketHelper');

const mafiaSolutionAction = {
    invoke: async (gameId, roundId, playerId, roomId, webSocketServer) => {
        await roundController.userPoll(roundId, playerId);
        const gameMafia = await gameController.getGameById(gameId);
        const returnData = JSON.stringify({
            route: 'game-event',
            roomId: roomId,
            game: gameMafia
        });
        await socketHelper.socketSender(webSocketServer, returnData);
    },
}

module.exports = mafiaSolutionAction;