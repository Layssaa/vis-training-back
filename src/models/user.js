const { Mongoose } = require("../database/_connection");
const Schema = Mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // ... {}
});

const User = mongoose.model("User", User);

module.exports = { User };
