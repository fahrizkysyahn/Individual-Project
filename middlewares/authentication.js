const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { authorization } = req.headers;

    // console.log(req.headers);
    // console.log(authorization);

    if (!authorization) throw { status: 401, message: "Unauthorized" };

    const token = authorization.split(" ")[1];
    // console.log(token, "TOKEN");
    const payload = verifyToken(token);
    // console.log(payload, "PAYLOAD");

    const user = await User.findByPk(payload.id);
    if (!user) throw { status: 401, message: "Unauthorized" };

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { authentication };
