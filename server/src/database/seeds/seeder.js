const seedUser = require('./seedUser');
const seedRoom = require('./seedRoom');
const seedGame = require('./seedGame');

const seed = async () => {
    await seedUser();
    await seedRoom();
    await seedGame();
};

module.exports = seed;
