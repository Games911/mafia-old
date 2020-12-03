const {createRoom, findAll} = require('../../repositories/room/roomRepository');
const {findById} = require('../../repositories/auth/userRepository');

module.exports = {
    createRoom: async (name, userId) => {
        const user = await findById(userId);
        if (user) {
            return await createRoom(name, user);
        } else {
            throw new Error('User doesn\'t exist');
        }
    },

    getRooms: async () => {
        return findAll();
    },
}
