const seedUser = require('./seedUser');

const seed = async () => {
    return seedUser();
};

module.exports = seed;
