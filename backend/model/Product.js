const mongoose = require("mongoose");
const path = require("path");
const schema = new mongoose.Schema({
    productName: {
      type: String,
      require: true,
    },
  });
  
  const Product = new mongoose.model("product", schema);
  
  module.exports = Product;