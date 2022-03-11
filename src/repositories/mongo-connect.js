import { User } from "../models/index.js";

async function findUserMongoDB(_obj) {
  if (Object.keys(_obj).length === 0) {
    return await User.find({}).sort({ title: -1 });
  }
  return await User.findOne({ ..._obj });
}

async function insertUserMongoDB(_obj) {
  return await User.create(_obj);
}

export { findUserMongoDB, insertUserMongoDB };
