const gameController = require('../../controllers/game/gameController');
const socketHelper = require('../../helpers/socketHelper');

// mafia results
const mafiaResultAction = {
    invoke: async (game, currentRound, roomId, webSocketServer) => {
        game = await gameController.gameSetStatus(game._id, currentRound._id, 'mafia-result');
        const killedMafiaPlayersArr = await gameController.getPollResult(game._id);
        let mafiaPollResult = false;
        if (killedMafiaPlayersArr.length > 0) {
            await gameController.killPlayers(killedMafiaPlayersArr);
            mafiaPollResult = true;
        }
        await gameController.setPollZero(game._id);
        const returnData = JSON.stringify({
            route: 'game-event',
            roomId: roomId,
            game: game,
            mafiaPollResult: mafiaPollResult,
            killedPlayersArr: killedMafiaPlayersArr
        });
        await socketHelper.socketSender(webSocketServer, returnData);
        await socketHelper.sleep(7000);
    },
}

module.exports = mafiaResultAction;