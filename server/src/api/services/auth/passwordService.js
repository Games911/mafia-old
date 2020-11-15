const bcrypt = require('bcrypt');
const { saltRound } = require('../../../config/settings');


const hashPassword = async (password) => {
    const salt = bcrypt.genSaltSync(parseInt(saltRound));
    return bcrypt.hashSync(password, salt);
};

module.exports = hashPassword;