const { response } = require("../helpers/response");
const db = require("../db");
const nullCheck = require("../helpers/nullCheck");

async function createUser(req, res) {
  const transaction = await db.sequelize.transaction();
  try {
    if (!nullCheck(req.body, ["firstName", "lastName", "email"]))
      throw "Missing Parameters";
    await db.User.create({ ...req.body }, { transaction });
    await transaction.commit();
    return response(res, 200, { message: "User created successfully." });
  } catch (e) {
    await transaction.rollback();
    return response(res, 500, {
      message: "Invalid user data provided.",
      error: e.toString(),
    });
  }
}

async function deleteUser(req, res) {
  const transaction = await db.sequelize.transaction();
  try {
    if (!nullCheck(req.user, ["id"])) throw "Missing User Id To Delete using";
    await db.User.destroy({ where: { id: req.user.id }, transaction });
    await transaction.commit();
    return response(res, 200, { message: "User deleted" });
  } catch (error) {
    await transaction.rollback();
    return response(res, 500, {
      message: "Invalid user data provided",
      error: error.toString(),
    });
  }
}

async function updateUserEntirely(req, res) {
  const transaction = await db.sequelize.transaction();
  try {
    if (!nullCheck(req.user, ["id"])) throw "User Id not available";
    if (!nullCheck(req.body, ["firstName", "lastName", "email"]))
      throw "Missing Body";
    await db.User.update(
      { ...req.body },
      { where: { id: req.user.id }, transaction }
    );
    await transaction.commit();
    return response(res, 200, { message: "User updated entirely" });
  } catch (e) {
    await transaction.rollback();
    return response(res, 500, {
      message: "Invalid user data provided.",
      error: e.toString(),
    });
  }
}

async function updateUserPartially(req, res) {
  const transaction = await db.sequelize.transaction();
  try {
    if (!nullCheck(req.user, ["id"])) throw "Missing user id";
    await db.User.update(
      { ...req.body },
      { where: { id: req.user.id }, transaction }
    );
    await transaction.commit();
    return response(res, 200, { message: "User updated partially" });
  } catch (e) {
    await transaction.rollback();
    return response(res, 500, {
      message: "Invalid user data provided.",
      error: e.toString(),
    });
  }
}

async function getUser(req, res) {
  try {
    if (!nullCheck(req.user, ["id"])) throw "Missing user id";
    const user = await db.User.findOne({ id: req.user.id });
    return response(res, 200, { message: "Found user.", user });
  } catch (e) {
    return response(res, 500, {
      message: "Couldn't fetch user.",
      error: e.toString(),
    });
  }
}

module.exports = {
  createUser,
  getUser,
  updateUserEntirely,
  updateUserPartially,
  deleteUser,
};
