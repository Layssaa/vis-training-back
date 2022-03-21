import { User } from "../models/index.js";

async function findUserMongoDB(_obj) {
  return await User.findOne({ ..._obj });
}

async function insertUserMongoDB(_obj) {
  return await User.create(_obj);
}

async function updateDataMongoDB(_type, _findId, _obj) {
  try {
    const obj = {
      ..._obj,
      date: new Date(),
    };

    let userFind;
    if (_type === "running") {
      userFind = await User.findOneAndUpdate(
        { _id: _findId },
        {
          $push: {
            "modalities.running.records": obj,
          },
          $set: {
            "modalities.running.name": _type,
          },
        },
        { returnDocument: "after" }
      );
    }

    if (_type === "cycling") {
      userFind = await User.findOneAndUpdate(
        { _id: _findId },
        {
          $push: {
            "modalities.cycling.records": obj,
          },
          $set: {
            "modalities.cycling.name": _type,
          },
        },
        { returnDocument: "after" }
      );
    }

    if (_type === "walking") {
      userFind = await User.findOneAndUpdate(
        { _id: _findId },
        {
          $push: {
            "modalities.walking.records": obj,
          },
          $set: {
            "modalities.walking.name": _type,
          },
        },
        { returnDocument: "after" }
      );
    }
    userFind.updated_At = new Date();
    await userFind.save();

    return { updated: userFind };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

async function findByDate({ from, to, modality, id }) {
  const userFounded = await User.findOne({ _id: id });

  const result = userFounded.modalities[modality].records.filter((elem) => {
    if(!elem.date){
      return
    }

    const biggerThen =
      changeTimeToMilliseconds(elem.date) >= changeTimeToMilliseconds(from);
    const lessThan =
      changeTimeToMilliseconds(elem.date) <= changeTimeToMilliseconds(to);


    if (biggerThen && lessThan) {
      return elem;
    }
  });

  return result
}


function changeTimeToMilliseconds(_time) {
  return new Date(_time);
}

export { findUserMongoDB, insertUserMongoDB, updateDataMongoDB, findByDate };
