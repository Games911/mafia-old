const {findAll} = require('../../repositories/room/roomRepository');

module.exports = {
    getRooms: async () => {
        return findAll();
    },
}
