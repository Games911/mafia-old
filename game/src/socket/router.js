const WebSocket = require('ws');
const roomController = require('./controllers/room/roomController');
const gameController = require('./controllers/game/gameController');
const roundController = require('./controllers/game/roundController');
const { userCountRoom } = require('../config/settings');

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
                            for (let c = 1; c <= userCountRoom; c++) {
                                    if (c !== 1) {
                                        game = await gameController.gameNextSpeaker(game._id, currentRound._id);
                                    }
                                    returnData = JSON.stringify({
                                        route: 'game-event',
                                        roomId: data.roomId,
                                        game: game,
                                    });
                                    socketSender(returnData);
                                    await sleep(5000);
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
                            await sleep(5000);
                            /* All Chat */

                            /* Poll */
                            for (let p = 1; p <= userCountRoom; p++) {
                                if (p === 1) {
                                    await gameController.gameSetStatus(game._id, currentRound._id, 'poll');
                                    game = await gameController.gameSetSpeaker(game._id, currentRound._id, 1);
                                } else {
                                    game = await gameController.gameNextSpeaker(game._id, currentRound._id);
                                }
                                returnData = JSON.stringify({
                                    route: 'game-event',
                                    roomId: data.roomId,
                                    game: game,
                                    pollEvent: true
                                });
                                socketSender(returnData);
                                await sleep(7000);
                            }

                            game = await gameController.getGameById(game._id);
                            const additionalPoll = await gameController.getAditionalPoll(game.players);
                            if (additionalPoll.length > 1) {
                                returnData = JSON.stringify({
                                    route: 'game-event',
                                    roomId: data.roomId,
                                    game: game,
                                    additionalPoll: additionalPoll
                                });
                                socketSender(returnData);
                            }
                            /* Poll */

                            /* Mafia Chat */
                            if (i !== 1) {
                                game = await gameController.gameSetStatus(game._id, currentRound._id, 'mafia');
                                returnData = JSON.stringify({
                                    route: 'game-event',
                                    roomId: data.roomId,
                                    game: game,
                                });
                                socketSender(returnData);
                                await sleep(15000);
                            }
                            /* Mafia Chat */

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
            }
        });
        ws.on("error", e => ws.send(e));
    });
};

module.exports = {
    socketRouter
};