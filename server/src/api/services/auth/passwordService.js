const bcrypt = require('bcrypt');
const { saltRound } = require('../../../config/settings');


const hashPassword = async (password) => {
    const salt = bcrypt.genSaltSync(parseInt(saltRound));
    return bcrypt.hashSync(password, salt);
};

const comparePassword = async (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword);
}


module.exports = {
    hashPassword,
    comparePassword
};