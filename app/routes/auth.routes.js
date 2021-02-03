const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middleware/isAuthenticated");
router.get("/jwt", isAuthenticated, authController.getFreshJWT);
router.post("/login", authController.login);
router.post("/signup", authController.signup);

module.exports = router;
