const axios = require("axios");
const { Transaction, Category } = require("../models");

class AIController {
  static async analyze(req, res, next) {
    try {
      const transactions = await Transaction.findAll({
        where: { UserId: req.user.id },
        include: [{ model: Category, attributes: ["name"] }],
        attributes: ["amount", "description", "transaction_date"],
      });

      if (transactions.length === 0) {
        return res.json({
          result: "Belum ada transaksi untuk dianalisis.",
        });
      }

      const transactionText = transactions
        .map(
          (t) =>
            `- ${t.transaction_date} | ${t.Category.name} | Rp${t.amount} | ${t.description}`,
        )
        .join("\n");

      const prompt = `
        Kamu adalah financial advisor. Berikut data transaksi keuangan pengguna:
        
        ${transactionText}
        
        Berikan analisis singkat dan 3 saran penghematan yang spesifik berdasarkan data di atas.
        Gunakan bahasa Indonesia yang friendly dan mudah dipahami.
        Jawab dalam format:
        - Analisis: (ringkasan kondisi keuangan)
        - Saran 1: ...
        - Saran 2: ...
        - Saran 3: ...
      `;

      const { data } = await axios.post(
        `https://api.groq.com/openai/v1/chat/completions`,
        {
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      const result = data.choices[0].message.content;

      res.json({ result });
    } catch (err) {
      //   console.log(err.response.data);

      next(err);
    }
  }
}

module.exports = AIController;
