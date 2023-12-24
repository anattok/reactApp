const jwt = require('jsonwebtoken');
const { secretKey } = require('./constants');

const sign = (data) => jwt.sign(data, secretKey, { expiresIn: '1h' });
const verify = (token, callback) => jwt.verify(token, secretKey, callback);

module.exports = {
    sign,
    verify,
};