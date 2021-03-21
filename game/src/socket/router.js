const gameController = require('./controllers/game/gameController');
const roundController = require('./controllers/game/roundController');
const startGameAction = require('./socket-actions/startGameAction');
const playerChatAction = require('./socket-actions/chat/playerChatAction');
const allChatAction = require('./socket-actions/chat/allChatAction');
const pollAction = require('./socket-actions/poll/pollAction');
const additionalPollAction = require('./socket-actions/poll/additionalPollAction');
const pollEndAction = require('./socket-actions/poll/pollEndAction');
const mafiaChatAction = require('./socket-actions/mafia/mafiaChatAction');
const mafiaPollAction = require('./socket-actions/mafia/mafiaPollAction');
const mafiaResultAction = require('./socket-actions/mafia/mafiaResultAction');
const refreshRoomsAction = require('./socket-actions/room/refreshRoomsAction');
const sendMessageAction = require('./socket-actions/message/sendMessageAction');
const userPollAction = require('./socket-actions/poll/userPollAction');
const userAdditionalPollAction = require('./socket-actions/poll/userAdditionalPollAction');
const mafiaSolutionAction = require('./socket-actions/mafia/mafiaSolutionAction');
const {getGameById} = require('./repositories/game/gameRepository');

let game = null;

const socketRouter = async (io) => {
    io.on("connection", function (socket) {
        socket.on("start-game", async (data) => {
            game = await startGameAction.startGame(data.roomId);
            await (async () => {
                for (let i = 1; i <= 10; i++) {
                    game = await getGameById(game._id);

                    const currentRound = await roundController.getCurrentRound(game);
                    await playerChatAction.invoke(game, currentRound._id, data.roomId, socket);
                    await allChatAction.invoke(game, currentRound._id, data.roomId, socket);

                    await pollAction.invoke(game, currentRound._id, data.roomId, socket);
                    const killedPlayersArr = await gameController.getPollResult(game._id);
                    await gameController.setPollZero(game._id);

                    let addPollResult = (killedPlayersArr.length > 0);
                    if (killedPlayersArr.length > 1) {
                        await additionalPollAction.invoke(game, currentRound._id, data.roomId, killedPlayersArr, socket);
                        addPollResult = await gameController.resolveAddPoll(game._id, killedPlayersArr);
                    } else {
                        await gameController.killPlayers(killedPlayersArr);
                    }
                    await pollEndAction.invoke(game, currentRound._id, data.roomId, killedPlayersArr, addPollResult, socket);

                    if (i !== 1) {
                        await mafiaChatAction.invoke(game, currentRound._id, data.roomId, socket);
                        await mafiaPollAction.invoke(game, currentRound._id, data.roomId, socket);
                        await mafiaResultAction.invoke(game, currentRound._id, data.roomId, socket);
                    }

                    await gameController.gameNextRound(game._id, currentRound._id);
                }
            })()
        });
        socket.on("create-room", async (data) => {
            socket.join(data.roomId);

            const rooms = io.of("/").adapter.rooms;
            console.log(rooms);

            await refreshRoomsAction.invoke(socket);
        });
        socket.on("add-user", async (data) => {
            socket.join(data.roomId);

            const rooms = io.of("/").adapter.rooms;
            console.log(rooms);

            await refreshRoomsAction.invoke(socket);
        });
        socket.on("out-user", async (data) => {
            socket.leave(data.roomId);

            const rooms = io.of("/").adapter.rooms;
            console.log(rooms);

            await refreshRoomsAction.invoke(socket);
        });
        socket.on("refresh-rooms", async () => {
            await refreshRoomsAction.invoke(socket);
        });
        socket.on("send-message", async (data) => {
            await sendMessageAction.invoke(data.game, data.roundId, data.playerId, data.textMessage, socket);
        });
        socket.on("user-poll", async (data) => {
            await userPollAction.invoke(data.game._id, data.roundId, data.playerId, data.roomId, socket);
        });
        socket.on("user-add-poll", async (data) => {
            await userAdditionalPollAction.invoke(data.game._id, data.value, data.roomId, socket);
        });
        socket.on("mafia-add-poll", async (data) => {
            await mafiaSolutionAction.invoke(data.game._id, data.roundId, data.playerId, data.roomId, socket);
        });
    });
};

module.exports = {
    socketRouter
};
