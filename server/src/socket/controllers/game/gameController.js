const {createGame} = require('../../repositories/game/gameRepository');

module.exports = {
    startGame: async (room) => {
        return await createGame(room);
    },
}
