const router = require("express").Router();
const userRouter = require("./user.routes");
const authRouter = require("./auth.routes");
router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;
