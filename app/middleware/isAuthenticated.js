const response = require("../helpers/response");
const db = require("../db");
const nullCheck = require("../helpers/nullCheck");
const { jwtVerify } = require("../helpers/jwt");
async function isAuthenticated(req, res, next) {
  try {
    if (!nullCheck(req.headers, ["authorization"]))
      throw "No authorization header";
    const token = req.headers["authorization"].split(" ")[1];
    if (token == "" || token == undefined) throw "Malformed request";
    const payload = jwtVerify(token);
    const user = await db.User.findOne({ id: payload.id });
    req.user = user;
    return next();
  } catch (error) {
    return response(res, 401, {
      message: "Unauthorized or Expired Token",
      error: error.toString(),
    });
  }
}

module.exports = { isAuthenticated };
