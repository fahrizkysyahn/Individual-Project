const { Transaction } = require("../models");

class TransactionController {
  static async findAll(req, res, next) {
    try {
      const data = await Transaction.findAll({
        where: { UserId: req.user.id },
      });

      //   console.log(data);

      res.status(200).json({
        data: data.map((el) => ({
          amount: el.amount,
          description: el.description,
          transaction_date: el.transaction_date,
        })),
      });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { CategoryId, amount, description, transaction_date } = req.body;
      const data = await Transaction.create({
        UserId: req.user.id,
        CategoryId,
        amount,
        description,
        transaction_date,
      });

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async findById(req, res, next) {
    try {
      const data = await Transaction.findOne({
        where: {
          id: req.params.id,
          UserId: req.user.id,
        },
      });

      if (!data) throw { status: 404, message: "Not Found" };

      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const trx = await Transaction.findOne({
        where: { id: req.params.id, UserId: req.user.id },
      });

      if (!trx) throw { status: 404, message: "Not Found" };

      await trx.update(req.body);

      res.json(trx);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const trx = await Transaction.findOne({
        where: { id: req.params.id, UserId: req.user.id },
      });

      if (!trx) throw { status: 404, message: "Not Found" };

      await trx.destroy();

      res.json({ message: "History succesfully deleted" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TransactionController;
