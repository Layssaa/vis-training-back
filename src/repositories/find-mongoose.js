const { User } = require("../models/user");

async function findMongoDB(_obj) {
  if (Object.keys(_obj).length === 0) {
    return await User.find({}).sort({ title: -1 });
  }
  return await User.find({ ..._obj });
}

module.exports = { findMongoDB };
