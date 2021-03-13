const WebSocket = require('ws');
const roomController = require('./controllers/room/roomController');
const gameController = require('./controllers/game/gameController');
const roundController = require('./controllers/game/roundController');
const socketHelper = require('./helpers/socketHelper');
const startGameAction = require('./socket-actions/startGameAction');
const playerChatAction = require('./socket-actions/chat/playerChatAction');
const allChatAction = require('./socket-actions/chat/allChatAction');
const pollAction = require('./socket-actions/poll/pollAction');
const additionalPollAction = require('./socket-actions/poll/additionalPollAction');
const pollEndAction = require('./socket-actions/poll/pollEndAction');
const mafiaChatAction = require('./socket-actions/mafia/mafiaChatAction');
const mafiaPollAction = require('./socket-actions/mafia/mafiaPollAction');
const mafiaResultAction = require('./socket-actions/mafia/mafiaResultAction');

let game = null;

const socketRouter = async (server) => {
    const webSocketServer = new WebSocket.Server({ server });
    webSocketServer.on('connection', (ws) => {
        ws.on('message', async (m) => {
            const data = JSON.parse(m);
            let returnData = null;
            switch(data.route) {
                case 'start-game':
                    game = await startGameAction.startGame(data.room);

                    await (async () => {
                        for (let i = 1; i <= 10; i++) {
                            const currentRound = await roundController.getCurrentRound(game);
                            await playerChatAction.invoke(game, currentRound, data.roomId, webSocketServer);
                            await allChatAction.invoke(game, currentRound, data.roomId, webSocketServer);

                            await pollAction.invoke(game, currentRound, data.roomId, webSocketServer);
                            const killedPlayersArr = await gameController.getPollResult(game._id);
                            await gameController.setPollZero(game._id);

                            let addPollResult = (killedPlayersArr.length > 0);
                            if (killedPlayersArr.length > 1) {
                                await additionalPollAction.invoke(game, currentRound, data.roomId, killedPlayersArr, webSocketServer);
                                addPollResult = await gameController.resolveAddPoll(game._id, killedPlayersArr);
                            } else {
                                await gameController.killPlayers(killedPlayersArr);
                            }
                            await pollEndAction.invoke(game, currentRound, data.roomId, killedPlayersArr, addPollResult, webSocketServer);

                            await mafiaChatAction.invoke(game, currentRound, data.roomId, webSocketServer);
                            await mafiaPollAction.invoke(game, currentRound, data.roomId, webSocketServer);
                            await mafiaResultAction.invoke(game, currentRound, data.roomId, webSocketServer);

                            await gameController.gameNextRound(game._id, currentRound._id);
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
                    game = await gameController.getGameById(data.game._id);
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