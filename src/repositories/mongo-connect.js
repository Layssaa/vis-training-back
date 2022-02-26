const { User } = require("../models/user");

module.exports = {
  async findUserMongoDB(_obj) {
    if (Object.keys(_obj).length === 0) {
      return await User.find({}).sort({ title: -1 });
    }
    return await User.find({ ..._obj });
  },
};
