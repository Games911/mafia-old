const WebSocket = require('ws');

const socketRouter = (server) => {
    const webSocketServer = new WebSocket.Server({ server });
    webSocketServer.on('connection', ws => {
        ws.on('message', m => {
            const data = JSON.parse(m);
            let returnData = null;
            switch(data.route) {
                case 'add-user':
                    break;
                case 'login':
                    break;
            }
            webSocketServer.clients.forEach(client => client.send(returnData));
        });
        ws.on("error", e => ws.send(e));
    });
};

module.exports = {
    socketRouter
};