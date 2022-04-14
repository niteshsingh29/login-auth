const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/shopping", {})
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err.message);
  });

const schema = new mongoose.Schema({
  userName: {
    type: String,
  },
  Email: {
    type: String,
    unique: true,
  },
  Password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  token: {
    type: String,
    require:true,
  },
});

const Register = new mongoose.model("Register", schema);

module.exports = Register;
