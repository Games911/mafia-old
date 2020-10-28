const http = require('http');
const app = require('./app');
const { port } = require('./config/config');
const connectDb = require('./config/connectDb');

const server = http.createServer(app);

server.listen(port, function() {
    console.log(`Listening on ${port}`);
    connectDb()
        .then(() => {
            console.log("MongoDb connected");
        })
        .catch(err => console.log(err));
});