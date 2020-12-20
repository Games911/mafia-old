const jwt = require('json-web-token');
const { secret } = require('../../../config/settings');



const createToken = async (user) => {
    const payload = {
        "id": user._id,
        "email": user.email,
        "nikname": user.nikname,
        "iat": Date.now(),
    };
    return jwt.encode(secret, payload, (err, token) => {
        if (err) {
            console.error(err.name, err.message);
        } else {
            return token;
        }
    });
};

const decodeToken = async (token) => {
    return jwt.decode(secret, token, (err, decodedPayload, decodedHeader) => {
        if (err) {
            return false;
        } else {
            return decodedPayload;
        }
    });
}

module.exports = {
    createToken,
    decodeToken
};