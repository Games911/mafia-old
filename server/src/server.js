const http = require('http');
const app = require('./app');
const { port } = require('./config/settings');
const databaseHelper = require('./config/connectDb');
const WebSocket = require( "ws");


const server = http.createServer(app);


const webSocketServer = new WebSocket.Server({ server });
webSocketServer.on('connection', ws => {
    ws.on('message', m => {
        console.log(m);
        webSocketServer.clients.forEach(client => client.send(m));
    });
    ws.on("error", e => ws.send(e));
    ws.send('Hi there, I am a WebSocket server');
});


server.listen(port, function() {
    console.log(`Listening on ${port}`);
    databaseHelper.connect()
        .then(() => {
            console.log("MongoDb connected");
        })
        .catch(err => console.log(err));
});