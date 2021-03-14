const roomController = require('../../controllers/room/roomController');
const socketHelper = require('../../helpers/socketHelper');

const refreshRoomsAction = {
    invoke: async (webSocketServer) => {
        const rooms = await roomController.getRooms();
        const returnData = JSON.stringify({route: 'rooms-event', rooms: rooms});
        await socketHelper.socketSender(webSocketServer, returnData);
    },
}

module.exports = refreshRoomsAction;