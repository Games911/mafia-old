const WebSocket = require('ws');
const gameController = require('./controllers/game/gameController');
const roundController = require('./controllers/game/roundController');
const startGameAction = require('./socket-actions/startGameAction');
const playerChatAction = require('./socket-actions/chat/playerChatAction');
const allChatAction = require('./socket-actions/chat/allChatAction');
const pollAction = require('./socket-actions/poll/pollAction');
const additionalPollAction = require('./socket-actions/poll/additionalPollAction');
const pollEndAction = require('./socket-actions/poll/pollEndAction');
const mafiaChatAction = require('./socket-actions/mafia/mafiaChatAction');
const mafiaPollAction = require('./socket-actions/mafia/mafiaPollAction');
const mafiaResultAction = require('./socket-actions/mafia/mafiaResultAction');
const refreshRoomsAction = require('./socket-actions/room/refreshRoomsAction');
const sendMessageAction = require('./socket-actions/message/sendMessageAction');
const userPollAction = require('./socket-actions/poll/userPollAction');
const userAdditionalPollAction = require('./socket-actions/poll/userAdditionalPollAction');
const mafiaSolutionAction = require('./socket-actions/mafia/mafiaSolutionAction');

let game = null;

const socketRouter = async (server) => {
    const webSocketServer = new WebSocket.Server({ server });
    webSocketServer.on('connection', (ws) => {
        ws.on('message', async (m) => {
            const data = JSON.parse(m);
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
                    await refreshRoomsAction.invoke(webSocketServer);
                    break;
                case 'send-message':
                    await sendMessageAction.invoke(data.game, data.roundId, data.playerId, data.textMessage, webSocketServer);
                    break;
                case 'user-poll':
                    await userPollAction.invoke(data.game._id, data.roundId, data.playerId, data.roomId, webSocketServer);
                    break;
                case 'user-add-poll':
                    await userAdditionalPollAction.invoke(data.game._id, data.value, data.roomId, webSocketServer);
                    break;
                case 'mafia-add-poll':
                    await mafiaSolutionAction.invoke(data.game._id, data.roundId, data.playerId, data.roomId, webSocketServer);
                    break;
            }
        });
        ws.on("error", e => ws.send(e));
    });
};

module.exports = {
    socketRouter
};