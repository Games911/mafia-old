const WebSocket = require('ws');
const roomController = require('./controllers/room/roomController');

const socketRouter = async (server) => {
    const webSocketServer = new WebSocket.Server({ server });
    webSocketServer.on('connection', ws => {
        ws.on('message', async (m) => {
            const data = JSON.parse(m);
            let returnData = null;
            switch(data.route) {
                case 'refresh-rooms':
                    const rooms = await roomController.getRooms();
                    returnData = JSON.stringify({route: 'rooms', rooms: rooms});
                    webSocketServer.clients.forEach(client => client.send(returnData));
                    break;
                case 'login':
                    break;
            }
        });
        ws.on("error", e => ws.send(e));
    });
};

module.exports = {
    socketRouter
};