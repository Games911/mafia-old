const {findAll} = require('../../../api/repositories/room/roomRepository');

module.exports = {
    getRooms: async () => {
        return findAll();
    },
}
