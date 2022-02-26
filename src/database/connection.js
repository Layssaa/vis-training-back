const mongoose = require("mongoose");
const { MONGO_HOST } = require("../config/index");

mongoose.connect(MONGO_HOST);

module.exports = mongoose;
