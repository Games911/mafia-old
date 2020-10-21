const { mongoUrl } = require('./config');
const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

module.exports = {
    initializeDB: async () => {
        let conn = mongoose.connect(mongoUrl, options).then(()=>{
            console.log('MongoDB is connected')
        });
        conn.catch((err) => {
            console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
        });
        mongoose.Promise = global.Promise;
    },
    cors: async (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    }
}