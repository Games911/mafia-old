const gameController = require('../controllers/game/gameController');

const startGameAction = {
    startGame: async (room) => {
        return await gameController.startGame(room);
    },
}

module.exports = startGameAction;