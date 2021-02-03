const router = require("express").Router();
const controller = require("../controllers/user.controller");
const { isAuthenticated } = require("../middleware/isAuthenticated");
router.post("/", isAuthenticated, controller.createUser);
router.get("/", isAuthenticated, controller.getUser);
router.put("/", isAuthenticated, controller.updateUserEntirely);
router.patch("/", isAuthenticated, controller.updateUserPartially);
router.delete("/", isAuthenticated, controller.deleteUser);

module.exports = router;
