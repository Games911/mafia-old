const mongoose = require('mongoose');
const Game = require('../../../database/models/game/Game');
const Round = require('../../../database/models/game/Round');
const Player = require('../../../database/models/game/Player');
const ConfirmPoll = require('../../../database/models/game/ConfirmPoll');
const {setPollZero} = require('../../repositories/game/playerRepository');

let Numbers = [1, 2, 3];
let Roles = ['Mafia', 'Peacefull', 'Mafia'];

const gameRepository = {
    createGame: async (room) => {
        const gameExist = (await Game.find({ room: room._id }).limit(1))[0];
        if (gameExist) {
            throw new Error('Room already exist');
        }

        let players = [];

        for (const element of room.users) {
            const number = Numbers.shift();
            const role = shuffle(Roles).pop();


            const player = new Player({
                _id: new mongoose.Types.ObjectId(),
                user: element,
                number: number,
                role: role,
            });
            await player.save();
            players.push(player);
        }
        rewriteValues();

        const round = new Round({
            _id: new mongoose.Types.ObjectId()
        });
        await round.save();

        const game = new Game({
            _id: new mongoose.Types.ObjectId(),
            players: players,
            room: room,
            rounds: [round],
        });
        await game.save();
        return game;
    },

    updateGameRound: async (gameId, round) => {
        const game = await gameRepository.getGameById(gameId);
        game.rounds.push(round);
        await game.updateOne(game);
        return game;
    },

    setNullPoll: async (gameId) => {
        let game = await gameRepository.getGameById(gameId);
        for (const player of game.players) {
            await setPollZero(player._id);
        }
    },

    getGameById: async (gameId) => {
        const game = (await Game.find({ _id: gameId }).populate('rounds').populate('players').populate('confirmPoll').limit(1))[0];
        if (typeof game !== 'undefined') {
            return game;
        }
        throw new Error('Game doesn\'t exist');
    },

    rewriteValues: async () => {
        Numbers = [1, 2];
        Roles = ['Mafia', 'Peacefull'];
    },

    shuffle: async(arr) => {
        return arr.sort(() => Math.round(Math.random() * 100) - 50);
    },

    createAddPoll: async(gameId, value) => {
        const game = await gameRepository.getGameById(gameId);

        const confirmPoll = new ConfirmPoll({
            _id: new mongoose.Types.ObjectId(),
            solution: value
        });
        await confirmPoll.save();

        game.confirmPoll.push(confirmPoll);
        await game.updateOne(game);
    },
}

module.exports = gameRepository;

const rewriteValues = () => {
    Numbers = [1, 2];
    Roles = ['Mafia', 'Peacefull'];
}

const shuffle = (arr) => {
    return arr.sort(() => Math.round(Math.random() * 100) - 50);
}