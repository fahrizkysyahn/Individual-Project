const express = require("express");
const router = express.Router();
// const cors = require("cors");
const aiRoutes = require("./aiRoutes");
const authRoutes = require("./authRoutes");
const transactionRoutes = require("./transactionRoutes");
const newsRoutes = require("./newsRoutes");
const errorHandler = require("../middlewares/errorHandler");
const { authorization } = require("../middlewares/authorization");
const { authentication } = require("../middlewares/authentication");

router.use("/auth", authRoutes);

router.use(authentication);

router.use("/transactions", transactionRoutes);
router.use("/news", newsRoutes);
router.use("/ai", aiRoutes);

router.use(errorHandler);

module.exports = router;
