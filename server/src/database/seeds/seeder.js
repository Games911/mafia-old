const seedUser = require('./seedUser');
const seedRoom = require('./seedRoom');

const seed = async () => {
    await seedUser();
    await seedRoom();
};

module.exports = seed;
