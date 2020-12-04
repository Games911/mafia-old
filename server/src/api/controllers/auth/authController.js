const createToken = require('../../services/auth/jwtService');
const {hashPassword, comparePassword} = require('../../services/auth/passwordService');
const {createUser, findByNikname} = require('../../repositories/auth/userRepository');


module.exports = {
    createUser: async (email, nikname, password) => {
        const passwordHash = await hashPassword(password);
        const user = await createUser(email, nikname, passwordHash);
        const token = await createToken(user);
        return {token: token, userId: user._id};
    },

    loginUser: async (nikname, password) => {
        const user = await findByNikname(nikname);
        if (user && await comparePassword(password, user.password)) {
            return await createToken(user);
        }
        throw new Error('Wrong nikname or password');
    },
}
