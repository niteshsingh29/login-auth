const mongoose = require("mongoose");
const express = require("express");
const router = new express.Router();
const Register = require("../model/mongoose");
const Product = require("../model/Product");
const Brandprice = require("../model/Productbrand");
const Purchaselist = require("../model/Purchaselist");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const auth = require("../middleware/middleware");
const Session = require("../model/Session");

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
router
  .route("/login")
  .post(async (req, res) => {
    try {
      const { valueEmail, valuePassword } = req.body;
      if (!(valueEmail && valuePassword)) {
        return res.status(400).send("please fill email and password");
      }

      const Authentication = await Register.findOne({ Email: valueEmail });

      if (Authentication && Authentication.Password === valuePassword) {
        const a = {
          expiresIn: "360s",
        };
        const token = jwt.sign(
          { user_id: Authentication._id, valueEmail: valueEmail },
          process.env.JWT_KEY,
          a
        );

        Authentication.token = token;

        await Session.create({
          userEmail: valueEmail,
          token: token,
          expiration: a.expiresIn,
        });
        return res.status(200).send({
          login: true,
          jwt: token,
        });
      }
      return res.status(401).send("invlaid PAssword");
    } catch (err) {
      return res
        .status(500)
        .send(
          "sorry for incovenience caused due to internal error: " + err.message
        );
    }
  })
  .all((req, res) => {
    res.status(405).send("hey method not allowed");
  });

router.post("/addproduct", auth, async (req, res) => {
  try {
    const { productname } = req.body;
    if (!productname) {
      return res.status(400).send("productname is required");
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
      return res.status(400).send("product id needed ");
    }

    const products = await Product.find();
    const filteredProduct = products.filter((items) => items._id == product_id);

    if (filteredProduct.length >= 1) {
      const brand = await Brandprice.create({
        brandName: brandName,
        product_id: filteredProduct[0]._id,
        price: price,
      });
      const token = jwt.sign({ brand_id: brand._id }, process.env.JWT_KEY, {
        expiresIn: "2h",
      });
      brand.token = token;
      res.status(201).send({ success: true, jwt: token });
    } else {
      res
        .status(404)
        .send("sorry we dont have this type of products available");
    }
  } catch (err) {
    return res.status(500).send("Sorry internal error occured" + err.message);
  }
});

module.exports = router;
