const mongoose = require("mongoose");
const path = require("path");

const schema = new mongoose.Schema({
  token: String,
  userEmail: String,
  expiration: String,
});

const Session = new mongoose.model("session", schema);
module.exports = Session;
