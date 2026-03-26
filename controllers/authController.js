const { User } = require("../models");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");

class AuthController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const user = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({
        user: user.username,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      //   console.log(email);

      const user = await User.findOne({ where: { email } });

      //   console.log(user.email, "user dari controller");

      if (!user) throw { status: 401, message: "Invalid email/password" };

      //   console.log(user.password, password, "password dari controller");

      //   console.log(
      //     bcrypt.compareSync(
      //       "12345678",
      //       "$2b$10$8mx9b5UszNwjQYcObAsf.eL.YbweiPR8Lm4pMteFeeYUU1qgZqcwS",
      //     ),
      //   );

      const valid = comparePassword(password, user.password);
      if (!valid) throw { status: 401, message: "Invalid email/password" };

      const token = signToken({ id: user.id });

      res.json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res) {
    // hasil dari passport
    const token = signToken({ id: req.user.id });

    res.json({ access_token: token });
  }
}

module.exports = AuthController;
