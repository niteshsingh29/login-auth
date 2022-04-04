const mongoose = require("mongoose");
const express = require("express");
const router = new express.Router();
const Register = require("../model/mongoose");
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
      res.status(200).send(`<h1>Welcome Back ${Authentication.userName}</h1>`)
    } else {
      console.log("Password doesnt match");
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
