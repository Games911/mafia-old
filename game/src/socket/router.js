const WebSocket = require('ws');
const roomController = require('./controllers/room/roomController');
const gameController = require('./controllers/game/gameController');
const roundController = require('./controllers/game/roundController');

/*for (const [index, value] of [1, 2, 3, 4, 5].entries()) {
    console.log(index, value);
}*/


const socketRouter = async (server) => {
    const webSocketServer = new WebSocket.Server({ server });
    webSocketServer.on('connection', (ws) => {
        ws.on('message', async (m) => {
            const data = JSON.parse(m);
            let returnData = null;
            switch(data.route) {
                case 'start-game':
                    const gameStart = await gameController.startGame(data.room);

                    const sleep = m => new Promise(r => setTimeout(r, m));
                    const socketSender = (returnData) => {
                        webSocketServer.clients.forEach(function each(client) {
                            if (client.readyState === WebSocket.OPEN) {
                                client.send(returnData);
                            }
                        });
                    };
                    const getCurrentRound = (game) => {
                        return game.rounds.slice(-1)[0];
                    }

                    await (async () => {
                        for (let i = 1; i <= 10; i++) {
                            let game = await gameController.getGameById(gameStart._id);
                            const currentRound = getCurrentRound(game);

                            /* Each user message */
                            for (const [index, value] of game.players.entries()) {
                                if (index !== 0) {
                                    game = await gameController.gameNextSpeaker(game._id, currentRound._id);
                                }
                                if (value.status === 'kill') continue;

                                returnData = JSON.stringify({
                                    route: 'game-event',
                                    roomId: data.roomId,
                                    game: game,
                                });
                                socketSender(returnData);
                                await sleep(3000);
                            }
                            /* Each user message */

                            /* All Chat */
                            game = await gameController.gameSetStatus(game._id, currentRound._id, 'chat');
                            returnData = JSON.stringify({
                                route: 'game-event',
                                roomId: data.roomId,
                                game: game,
                            });
                            socketSender(returnData);
                            await sleep(3000);
                            /* All Chat */

                            /* Poll */
                            for (const [index, value] of game.players.entries()) {
                                if (index === 0) {
                                    await gameController.gameSetStatus(game._id, currentRound._id, 'poll');
                                    game = await gameController.gameSetSpeaker(game._id, currentRound._id, 1);
                                } else {
                                    game = await gameController.gameNextSpeaker(game._id, currentRound._id);
                                }
                                if (value.status === 'kill') continue;

                                returnData = JSON.stringify({
                                    route: 'game-event',
                                    roomId: data.roomId,
                                    game: game,
                                    pollEvent: true
                                });
                                socketSender(returnData);
                                await sleep(3000);
                            }

                            game = await gameController.getGameById(game._id);
                            const killedPlayersArr = await gameController.getPollResult(game.players);
                            await gameController.setPollZero(game._id);

                            /* Additional Poll */
                            let addPollResult = (killedPlayersArr.length > 0);
                            if (killedPlayersArr.length > 1) {
                                game = await gameController.gameSetStatus(game._id, currentRound._id, 'poll-add');

                                for (const [index, value] of game.players.entries()) {
                                    if (index === 0) {
                                        game = await gameController.gameSetSpeaker(game._id, currentRound._id, 1);
                                    } else {
                                        game = await gameController.gameNextSpeaker(game._id, currentRound._id);
                                    }
                                    if (value.status === 'kill') continue;

                                    returnData = JSON.stringify({
                                        route: 'game-event',
                                        roomId: data.roomId,
                                        game: game,
                                        addPollArr: killedPlayersArr
                                    });
                                    socketSender(returnData);
                                    await sleep(3000);
                                }
                                addPollResult = await gameController.resolveAddPoll(game._id, killedPlayersArr);
                            } else {
                                await gameController.killPlayers(killedPlayersArr);
                            }
                            game = await gameController.gameSetStatus(game._id, currentRound._id, 'poll-end');
                            returnData = JSON.stringify({
                                route: 'game-event',
                                roomId: data.roomId,
                                game: game,
                                addPollResult: addPollResult,
                                killedPlayersArr: killedPlayersArr
                            });
                            socketSender(returnData);
                            await sleep(3000);
                            /* Additional Poll */
                            /* Poll */

                            /* Mafia Chat */
                            //if (i !== 1) {
                                game = await gameController.gameSetStatus(game._id, currentRound._id, 'mafia');
                                returnData = JSON.stringify({
                                    route: 'game-event',
                                    roomId: data.roomId,
                                    game: game,
                                });
                                socketSender(returnData);
                                await sleep(7000);
                            //}
                            /* Mafia Chat */

                            /* Mafia poll */
                            game = await gameController.gameSetStatus(game._id, currentRound._id, 'mafia-poll');
                            for (const [index, value] of game.players.entries()) {
                                if (index === 0) {
                                    game = await gameController.gameSetSpeaker(game._id, currentRound._id, 1);
                                } else {
                                    game = await gameController.gameNextSpeaker(game._id, currentRound._id);
                                }
                                if (value.role !== 'Mafia') continue;

                                returnData = JSON.stringify({
                                    route: 'game-event',
                                    roomId: data.roomId,
                                    game: game,
                                });
                                socketSender(returnData);
                                await sleep(7000);
                            }

                            game = await gameController.gameSetStatus(game._id, currentRound._id, 'mafia-result');
                            const killedMafiaPlayersArr = await gameController.getPollResult(game.players);
                            let mafiaPollResult = false;
                            if (killedMafiaPlayersArr.length > 0) {
                                await gameController.killPlayers(killedMafiaPlayersArr);
                                mafiaPollResult = true;
                            }
                            await gameController.setPollZero(game._id);
                            returnData = JSON.stringify({
                                route: 'game-event',
                                roomId: data.roomId,
                                game: game,
                                mafiaPollResult: mafiaPollResult,
                                killedPlayersArr: killedMafiaPlayersArr
                            });
                            socketSender(returnData);
                            await sleep(7000);
                            /* Mafia poll */

                            /* Set new round */
                            await gameController.gameNextRound(game._id, currentRound._id);
                            /* Set new round */
                        }
                    })()


                    break;
                case 'refresh-rooms':
                    const rooms = await roomController.getRooms();
                    returnData = JSON.stringify({route: 'rooms-event', rooms: rooms});
                    webSocketServer.clients.forEach(client => client.send(returnData));
                    break;
                case 'send-message':
                    const roundObjectMessage = await roundController.saveMessage(data.roundId, data.playerId, data.textMessage);
                    returnData = JSON.stringify({
                        route: 'new-message',
                        round: roundObjectMessage,
                        game: data.game
                    });
                    webSocketServer.clients.forEach(client => client.send(returnData));
                    break;
                case 'user-poll':
                    await roundController.userPoll(data.roundId, data.playerId);
                    const game = await gameController.getGameById(data.game._id);
                    returnData = JSON.stringify({
                        route: 'game-event',
                        roomId: data.roomId,
                        game: game
                    });
                    webSocketServer.clients.forEach(client => client.send(returnData));
                    break;
                case 'user-add-poll':
                    const gameAddPoll = await gameController.getGameById(data.game._id);
                    await gameController.createAddPoll(gameAddPoll._id, data.value);
                    returnData = JSON.stringify({
                        route: 'game-event',
                        roomId: data.roomId,
                        game: gameAddPoll
                    });
                    webSocketServer.clients.forEach(client => client.send(returnData));
                    break;
                case 'mafia-add-poll':
                    await roundController.userPoll(data.roundId, data.playerId);
                    const gameMafia = await gameController.getGameById(data.game._id);
                    returnData = JSON.stringify({
                        route: 'game-event',
                        roomId: data.roomId,
                        game: gameMafia
                    });
                    webSocketServer.clients.forEach(client => client.send(returnData));
                    break;
            }
        });
        ws.on("error", e => ws.send(e));
    });
};

module.exports = {
    socketRouter
};