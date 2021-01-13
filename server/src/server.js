const http = require('http');
const app = require('./app');
const { port } = require('./config/settings');
const databaseHelper = require('./config/connectDb');
const {socketRouter} = require('./socket/router');
const server = http.createServer(app);

socketRouter(server);

server.listen(port, function() {
    console.log(`Listening on ${port}`);
    databaseHelper.connect()
        .then(() => {
            console.log("MongoDb connected");
        })
        .catch(err => console.log(err));
});