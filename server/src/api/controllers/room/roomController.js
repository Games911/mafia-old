const {createRoom, findAll, roomFindById, addUser, outUser} = require('../../repositories/room/roomRepository');
const {userFindById} = require('../../repositories/auth/userRepository');

module.exports = {
    createRoom: async (name, userId) => {
        const user = await userFindById(userId);
        if (user) {
            return await createRoom(name, user);
        } else {
            throw new Error('User doesn\'t exist');
        }
    },

    getRooms: async () => {
        return findAll();
    },

    addUser: async (roomId, userId) => {
        const user = await userFindById(userId);
        const room = await roomFindById(roomId);
        return await addUser(room, user);
    },

    outRoom: async (roomId, userId) => {
        const user = await userFindById(userId);
        const room = await roomFindById(roomId);
        return await outUser(room, user);
    },
}
