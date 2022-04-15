const mongoose = require("mongoose");
const { type } = require("os");
const path = require("path");
const schema = new mongoose.Schema({
  purchased_list: Array,
});

const Purchaselist = new mongoose.model("purchaselist", schema);

module.exports = Purchaselist;
