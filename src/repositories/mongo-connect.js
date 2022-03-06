const { User } = require("../models/user");

module.exports = {
  async findUserMongoDB(_obj) {
    if (Object.keys(_obj).length === 0) {
      return await User.find({}).sort({ title: -1 });
    }
    return await User.findOne({ ..._obj });
  },
  async insertUserMongoDB(_obj) {
    return await User.create(_obj);
  },
};
