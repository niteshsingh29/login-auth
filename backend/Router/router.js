const mongoose = require("mongoose");
const express = require("express");
const router = new express.Router();
const Register = require("../model/mongoose");
const Product = require("../model/Product");
const Brandprice = require("../model/Productbrand");
const User = require("../model/User");
const cors = require("cors");

router.use(express.json());
router.use(cors());
router.get("/", (req, res) => {
  console.log("sending from router");
  res.send("sending from backend Router");
});

router.post("/register", async (req, res) => {
  try {
    const document = new Register({
      userName: req.body.userName,
      Email: req.body.Email,
      Password: req.body.Password,
      confirmPassword: req.body.confirmPassword,
    });
    const result = await document.save();
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
  }
});
router.post("/login", async (req, res) => {
  try {
    const email = req.body.valueEmail;
    const password = req.body.valuePassword;
    const Authentication = await Register.findOne({ Email: email });
    if (Authentication.Password === password) {
      console.log("user verified");
      res.status(200).send(Authentication);
    } else {
      console.log("Password doesnt match");
    }
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/addproduct", async (req, res) => {
  try {
    const productDocument = new Product({
      productName: req.body.productname,
    });
    const result = await productDocument.save();
    // const productId = await Product.findOne({
    //   _id: req.body._id,
    // });
    const brandDocument = new Brandprice({
      product_id: req.body._id,
      brandName: req.body.brand,
      price: req.body.price,
    });

    const result_1 = await brandDocument.save();

    res.status(200).send({ ...result, result_1 });
  } catch (err) {
    console.log(err.message);
  }
});
router.post("/purchase", async (req, res) => {
  try {
    const userId = req.body.user_id;
    const purchaseItem = await Brandprice.find({
      _id: req.body.itemId,
    });
    const document = new User({
      item_id: [...purchaseItem ],
      user_id: userId,
    });
    const result = await document.save();
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
