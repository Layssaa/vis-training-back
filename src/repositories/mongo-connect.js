import { User } from "../models/index.js";

async function findUserMongoDB(_obj) {
  return await User.findOne({ ..._obj });
}

async function insertUserMongoDB(_obj) {
  return await User.create(_obj);
}

async function updateDataMongoDB(_type, _findId, _obj) {
  try {
    const userFind = await User.findOne({ _id: _findId });
    _obj.date = new Date()

    userFind.modalities[_type].records.push(_obj);
    userFind.updated_At = new Date().toString();
    userFind.save();

  if (!modality) throw Error("Invalid category");
  
    return { updated: userFind };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export { findUserMongoDB, insertUserMongoDB, updateDataMongoDB };
