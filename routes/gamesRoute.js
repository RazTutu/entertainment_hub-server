const router = require("express").Router();
const { addGame } = require('../controllers/games');

router.post("/newGame", addGame);

module.exports = router;