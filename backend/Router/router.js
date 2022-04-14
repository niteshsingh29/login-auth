const mongoose = require("mongoose");
const express = require("express");
const router = new express.Router();
const Register = require("../model/mongoose");
const Product = require("../model/Product");
const Brandprice = require("../model/Productbrand");
const User = require("../model/User");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const auth = require("../middleware/middleware");

router.use(express.json());
router.use(cors());

router.get("/", auth, (req, res) => {
  res.status(200).send("Welcome");
});

router.post("/register", async (req, res) => {
  try {
    const { userName, Email, Password, confirmPassword } = req.body;
    if (!(userName && Email && Password && confirmPassword)) {
      res.status(400).send("please fill all details");
    }

    const alreadyUser = await Register.findOne({
      Email: Email,
    });
    if (alreadyUser) {
      res.status(409).send("user already exists");
    }
    const registered_user = await Register.create({
      userName: userName,
      Email: Email,
      Password: Password,
      confirmPassword: confirmPassword,
    });

    res.status(201).send(registered_user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { valueEmail, valuePassword } = req.body;
    if (!(valueEmail && valuePassword)) {
      res.status(400).send("please fill email and password");
    }

    const Authentication = await Register.findOne({ Email: valueEmail });

    if (Authentication && Authentication.Password === valuePassword) {
      const token = jwt.sign(
        { user_id: Authentication._id, valueEmail: valueEmail },
        process.env.JWT_KEY,
        { expiresIn: "2h" }
      );

      Authentication.token = token;
      res.status(200).json(token);
    }
    res.status(401).send("invlaid PAssword");
  } catch (err) {
    return res
      .status(500)
      .send(
        "sorry for incovenience caused due to internal error: " + err.message
      );
  }
});

router.post("/addproduct", async (req, res) => {
  try {
    const { productname } = req.body;
    if (!productname) {
      res.status(400).send("productname is required");
    }

    const product = await Product.create({
      productName: productname,
    });

    res.status(201).send(product);
  } catch (err) {
    return res
      .status(500)
      .send(
        "sorry for inconvenience caused this error is from internal server error" +
          err.message
      );
  }
});
router.post("/addbrands", async (req, res) => {
  try {
    const { brandName, price, product_id } = req.body;
    if (!product_id) {
      res.status(400).send("product id needed ");
    }
    const productId = await Product.findOne({
      _id: product_id,
    });
    console.log(productId);
    if (productId) {
      console.log("token will be created");
    } else {
      res
        .status(404)
        .send("sorry we dont have this type of products available");
    }

    // const products = await Product.find();
    // let productsArray = [];
    // products.map((item) => productsArray.push(item._id));
    // console.log(productsArray);

    // if (productsArray[1] === product_id) {
    //   console.log("ok will create token");
    // } else {
    //   res
    //     .status(404)
    //     .send("sorry we dont have this type of products available");
    // }
    // const brand = await Brandprice.create({
    //   brandName: brandName,
    //   product_id: productId._id,
    //   price: price,
    // });
    // const token = jwt.sign({ brand_id: brand._id }, process.env.JWT_KEY, {
    //   expiresIn: "2h",
    // });
    // brand.token = token;
    // res.status(201).send(token);
  } catch (err) {
    return res.status(500).send("Sorry internal error occured" + err.message);
  }
});

router.post("/purchase", async (req, res) => {
  try {
    const userId = req.body.user_id;
    const purchaseItem = await Brandprice.find({
      _id: req.body.itemId,
    });
    const document = new User({
      item_id: purchaseItem,
      user_id: userId,
    });
    const result = await document.save();
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
