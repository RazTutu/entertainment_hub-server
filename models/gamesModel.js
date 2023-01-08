const mongoose = require("mongoose");

const GamesSchema = new mongoose.Schema({
  name: String,
  platform: String,
});

module.exports = mongoose.model("games", GamesSchema)