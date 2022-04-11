const mongoose = require("mongoose");
const path = require("path");
const schema = new mongoose.Schema({
  product_id:String,
  brandName: String,
  price: Number,
});

const Brandprice = new mongoose.model("brandprice", schema);

module.exports = Brandprice;
