const mongoose = require("../database/_connection");
const Schema = mongoose.Schema;

const UserModel = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // ... {}
});

const User = mongoose.model("User", UserModel);

module.exports = { User };
