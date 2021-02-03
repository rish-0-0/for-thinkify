const db = require("../db");
const { response } = require("../helpers/response");
const { jwtSign } = require("../helpers/jwt");
const nullCheck = require("../helpers/nullCheck");
async function getFreshJWT(req, res) {
  try {
    const token = jwtSign({ email: req.user.email, id: req.user.id });
    return response(res, 200, { message: "Fresh token", token });
  } catch (error) {
    return response(res, 400, {
      message: "Couldn't generate fresh JWT. Please check request",
    });
  }
}

async function login(req, res) {
  try {
    if (!nullCheck(req.body, ["email"])) throw "Email missing";
    const user = await db.User.findOne({ email: req.body.email });
    const token = jwtSign({ email: user.email, id: user.id });
    return response(res, 200, {
      message: "Successfully logged in",
      token,
      user,
    });
  } catch (error) {
    return response(res, 400, {
      message: "Some parameter is missing or corrupt or User is incorrect",
      error: error.toString(),
    });
  }
}

async function signup(req, res) {
  const transaction = await db.sequelize.transaction();
  try {
    if (!nullCheck(req.body, ["email", "firstName", "lastName"]))
      throw "Bad Request something is missing";
    const user = await db.User.create(
      {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      { transaction, returning: true }
    );
    await transaction.commit();
    const token = jwtSign({ email: user.email, id: user.id });
    return response(res, 200, { token, user, message: "Signup completed" });
  } catch (error) {
    return response(res, 400, {
      message: "Some parameter is missing or corrupt",
      error: error.toString(),
    });
  }
}

module.exports = { login, signup, getFreshJWT };
