import { User } from "../models/index.js";

async function findUserMongoDB(_obj) {
  return await User.findOne({ ..._obj });
}

async function insertUserMongoDB(_obj) {
  return await User.create(_obj);
}

async function updateDataMongoDB(_type, _findId, _obj) {
  try {
    let userFind;
    if (_type === "running") {
      userFind = await User.findOneAndUpdate(
        { _id: _findId },
        {
          $push: {
            "modalities.running.records": _obj,
          },
          $set: {
            "modalities.running.name": _type,
          },
        },
        { returnDocument: 'after' }
      );
    }

    if (_type === "cycling") {
      userFind = await User.findOneAndUpdate(
        { _id: _findId },
        {
          $push: {
            "modalities.cycling.records": _obj,
          },
          $set: {
            "modalities.cycling.name": _type,
          },
        },
        { returnDocument: 'after' }
      );
    }

    if (_type === "walking") {
      userFind = await User.findOneAndUpdate(
        { _id: _findId },
        {
          $push: {
            "modalities.walking.records": _obj,
          },
          $set: {
            "modalities.walking.name": _type,
          },
        },
        { returnDocument: 'after' }
      );
    }

    console.log("user finded");
    console.log(userFind.modalities.walking.records);

    return { updated: userFind };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export { findUserMongoDB, insertUserMongoDB, updateDataMongoDB };
