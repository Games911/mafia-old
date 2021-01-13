const Game = require('../models/game/Game');
const Player = require('../models/game/Player');
const Message = require('../models/game/Message');
const Round = require('../models/game/Round');

const seedGame = async () => {

    Game.remove({}, function() {

    });

    Player.remove({}, function() {

    });

    Message.remove({}, function() {

    });

    Round.remove({}, function() {

    });

};

module.exports = seedGame;