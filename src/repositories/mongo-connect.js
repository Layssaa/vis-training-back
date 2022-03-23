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
  try {
    const userFounded = await User.findOne({ _id: id });

    let result = userFounded.modalities[modality].records.filter((elem) => {
      if (!elem.date) {
        return;
      }

      const biggerThen = toMilliseconds(elem.date) >= toMilliseconds(from);
      const lessThan = toMilliseconds(elem.date) <= toMilliseconds(to);

      if (biggerThen && lessThan) {
        return elem;
      }
    });

    result = result.sort((date1, date2) =>
      toMilliseconds(date1) >= toMilliseconds(date2) ? 1 : -1
    );

    return { result };
  } catch (error) {
    return error;
  }
}

async function updateUserDataMongoDB({ updates, id }) {
  try {
    const updated = await User.findOneAndUpdate(
      { _id: id },
      { ...updates },
      { returnDocument: "after" }
    );

    return { updated };
  } catch (error) {
    return { error };
  }
}


export {
  findUserMongoDB,
  insertUserMongoDB,
  updateDataMongoDB,
  findByDate,
  updateUserDataMongoDB,
};

function toMilliseconds(_time) {
  return new Date(_time);
}