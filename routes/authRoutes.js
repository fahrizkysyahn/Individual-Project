const router = require("express").Router();
const AuthController = require("../controllers/authController");
const passport = require("passport");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  AuthController.googleLogin,
);

module.exports = router;
