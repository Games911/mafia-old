const {createGame} = require('../../repositories/game/gameRepository');

module.exports = {
    startGame: async (room) => {
        try {
            return await createGame(room);
        } catch(error) {
            return null;
        }
    },
}
