const router = require("express").Router();
const AIController = require("../controllers/aiController");

router.post("/", AIController.analyze);

module.exports = router;
