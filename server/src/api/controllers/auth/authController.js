const {createToken, decodeToken} = require('../../services/auth/jwtService');
const {hashPassword, comparePassword} = require('../../services/auth/passwordService');
const {createUser, findByNikname, updateUserWithToken, userFindById} = require('../../repositories/auth/userRepository');
const {createTokenEntry, removeTokenEntry} = require('../../repositories/auth/tokenRepository');


const authController = {
    createUser: async (email, nikname, password) => {
        const passwordHash = await hashPassword(password);
        const user = await createUser(email, nikname, passwordHash);
        const token = await createToken(user);
        const tokenEntry = await createTokenEntry(token);
        await updateUserWithToken(user, tokenEntry);
        return {token: token, userId: user._id};
    },

    loginUser: async (nikname, password) => {
        const user = await findByNikname(nikname);
        if (user && await comparePassword(password, user.password)) {
            const token = await createToken(user);

            if (typeof user.token !== 'undefined') {
                await removeTokenEntry(user.token);
            }

            const tokenEntry = await createTokenEntry(token);
            await updateUserWithToken(user, tokenEntry);
            return token;
        }
        throw new Error('Wrong nikname or password');
    },

    checkToken: async (token) => {
        const tokenDecoded = await decodeToken(token);
        if (!tokenDecoded) return false;
        const user = await userFindById(tokenDecoded.id);
        const result = await authController.checkTokenExpiredDate(tokenDecoded.iat);
        return !(!user && user.token !== tokenDecoded.id && !result);
    },

    checkTokenExpiredDate: async (loginDate) => {
        const currentDate = Date.now();
        return ((currentDate - loginDate) < 86400000);
    }
}

module.exports = authController;