const { User } = require("../models/user");

async function findMongoose(_obj) {
  if (Object.keys(_obj).length === 0) {
    return await User.find({}).sort({ title: -1 });
  }
  return await User.find({ ..._obj });
}

module.exports = { findMongoose };
