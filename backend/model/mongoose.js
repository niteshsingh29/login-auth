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
      require: true,
      unique: true,
    },
    Email: {
      type: String,
      require: true,
      unique: true,
    },
    Password: {
      type: String,
      require: true,
      unique: true,
    },
    confirmPassword: {
      type: String,
      require: true,
      unique: true,
    },
  });
  
  const Register = new mongoose.model("Register", schema);
  
  module.exports = Register;
