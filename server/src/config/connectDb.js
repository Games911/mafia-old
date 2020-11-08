const { mongoUrl } = require('./settings');
const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const connectDb = async () => {
    return await mongoose.connect(mongoUrl, options);
};

module.exports = connectDb;