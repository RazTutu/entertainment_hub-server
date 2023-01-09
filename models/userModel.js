const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  username: String,
  avatar: String,
  googleId: String,
});

module.exports = mongoose.model("user", UserSchema);