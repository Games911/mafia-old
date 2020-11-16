require('dotenv').config();

const databaseHelper = require('../config/connectDb');

beforeAll(() => {
    return databaseHelper.connect();
});

beforeEach(() => {
    return databaseHelper.truncate();
});

afterAll(() => {
    return databaseHelper.disconnect();
});
