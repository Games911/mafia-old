const http = require('http');
const app = require('./app');
const { port } = require('./config/settings');
const databaseHelper = require('./config/connectDb');

const server = http.createServer(app);

server.listen(port, function() {
    console.log(`Listening on ${port}`);
    databaseHelper.connect()
        .then(() => {
            console.log("MongoDb connected");
        })
        .catch(err => console.log(err));
});