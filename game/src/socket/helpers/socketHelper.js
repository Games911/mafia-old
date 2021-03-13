const WebSocket = require('ws');

const socketHelper = {
    sleep: async (m) => {
        return new Promise(r => setTimeout(r, m));
    },

    socketSender: async (webSocketServer, returnData) => {
        webSocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(returnData);
            }
        });
    },
}

module.exports = socketHelper;