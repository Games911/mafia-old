const gameController = require('../controllers/game/gameController');

const startGameAction = {
    startGame: async (roomId) => {
        return await gameController.startGame(roomId);
    },
}

module.exports = startGameAction;