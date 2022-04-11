const mongoose = require("mongoose");
const path = require("path");
const schema = new mongoose.Schema({
  user_id: String,
  item_id: [String],
});

const User = new mongoose.model("user", schema);

module.exports = User;
