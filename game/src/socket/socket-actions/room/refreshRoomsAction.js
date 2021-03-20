const roomController = require('../../controllers/room/roomController');
const socketHelper = require('../../helpers/socketHelper');

const refreshRoomsAction = {
    invoke: async (socket) => {
        const rooms = await roomController.getRooms();
        socket.broadcast.emit("rooms-event", {rooms: rooms});
    },
}

module.exports = refreshRoomsAction;