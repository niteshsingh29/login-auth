const mongoose = require("mongoose");
const express = require("express");
const router = new express.Router();
const Register = require("../model/mongoose");
const cors = require("cors")

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
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
