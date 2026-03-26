const { Transaction } = require("../models");

async function authorization(req, res, next) {
  try {
    const transaction = await Transaction.findByPk(req.params.id);

    if (!transaction) throw { status: 404, message: "Not Found" };
    if (transaction.userId !== req.user.id) {
      throw { status: 403, message: "Forbidden" };
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { authorization };
