const jwt = require("jsonwebtoken");
const {
  dev: { secret },
} = require("../config/constants.json");
function jwtSign(toSign, timeout = "1h") {
  return jwt.sign(toSign, secret, { expiresIn: timeout });
}

/**
 * might throw an error
 * @param {String} token jwt
 * @returns {Object}
 */
function jwtVerify(token) {
  return jwt.verify(token, secret);
}

module.exports = { jwtSign, jwtVerify };
