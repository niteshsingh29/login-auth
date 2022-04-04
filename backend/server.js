const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8000;
const router = require("./Router/router");
const cors = require("cors");


app.use(router);
app.use(express.json());
app.use(cors());

app.listen(port, (req, res) => {
  console.log("listening on port " + port);
});
