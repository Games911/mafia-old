var jwt = require('json-web-token');
const { secret } = require('../../../config/settings');



const createToken = async (user) => {
    const payload = {
        "user": user._id,
        "nikname": user.nikname,
    };
    return jwt.encode(secret, payload, function (err, token) {
        if (err) {
            console.error(err.name, err.message);
        } else {
            return token;
        }
    });
};

module.exports = createToken;