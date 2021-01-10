const WebSocket = require('ws');
const roomController = require('./controllers/room/roomController');
const gameController = require('./controllers/game/gameController');

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
                    console.log(game);
                    if (game === null) returnData = null;
                    returnData = JSON.stringify({
                        route: 'start-game-event',
                        roomId: data.roomId,
                        game: game,
                        processMessage: null
                    });
                    webSocketServer.clients.forEach(client => client.send(returnData));
                    break;
                case "game-next":
                    console.log('Next');
                    const gameObject = await gameController.gameNext(data.game._id, data.roundId);
                    returnData = JSON.stringify({
                        route: 'start-game-event',
                        roomId: data.roomId,
                        game: gameObject.game,
                        processMessage: gameObject.processMessage
                    });
                    webSocketServer.clients.forEach(client => client.send(returnData));
            }
        });
        ws.on("error", e => ws.send(e));
    });
};

module.exports = {
    socketRouter
};