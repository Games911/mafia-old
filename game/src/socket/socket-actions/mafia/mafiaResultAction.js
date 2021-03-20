const gameController = require('../../controllers/game/gameController');
const socketHelper = require('../../helpers/socketHelper');

// mafia results
const mafiaResultAction = {
    invoke: async (game, roundId, roomId, socket) => {
        game = await gameController.gameSetStatus(game._id, roundId, 'mafia-result');
        const killedMafiaPlayersArr = await gameController.getPollResult(game._id);
        let mafiaPollResult = false;
        if (killedMafiaPlayersArr.length > 0) {
            await gameController.killPlayers(killedMafiaPlayersArr);
            mafiaPollResult = true;
        }
        await gameController.setPollZero(game._id);

        socket.broadcast.emit('game-event', {roomId: roomId, game: game, mafiaPollResult: mafiaPollResult, killedPlayersArr: killedMafiaPlayersArr});
        await socketHelper.sleep(7000);
    },
}

module.exports = mafiaResultAction;