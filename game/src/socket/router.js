const WebSocket = require('ws');
const roomController = require('./controllers/room/roomController');
const gameController = require('./controllers/game/gameController');
const roundController = require('./controllers/game/roundController');

const socketRouter = async (server) => {
    const webSocketServer = new WebSocket.Server({ server });
    webSocketServer.on('connection', ws => {
        ws.on('message', async (m) => {
            const data = JSON.parse(m);
            let returnData = null;
            switch(data.route) {
                case 'refresh-rooms':
                    const rooms = await roomController.getRooms();
                    returnData = JSON.stringify({route: 'rooms-event', rooms: rooms});
                    webSocketServer.clients.forEach(client => client.send(returnData));
                    break;
                case 'start-game':
                    const game = await gameController.startGame(data.room);
                    if (game === null) returnData = null;
                    returnData = JSON.stringify({
                        route: 'start-game-event',
                        roomId: data.roomId,
                        game: game,
                    });
                    webSocketServer.clients.forEach(client => client.send(returnData));
                    break;
                case 'game-next':
                    console.log('Next');
                    const gameObject = await gameController.gameNext(data.game._id, data.roundId);
                    returnData = JSON.stringify({
                        route: 'start-game-event',
                        roomId: data.roomId,
                        game: gameObject.game,
                    });
                    webSocketServer.clients.forEach(client => client.send(returnData));
                    break;
                case 'send-message':
                    const roundObject = await roundController.saveMessage(data.roundId, data.playerId, data.messageText);
                    returnData = JSON.stringify({
                        route: 'new-message',
                        round: roundObject,
                        game: data.game
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