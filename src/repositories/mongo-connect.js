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

    const userFind = await User.findOneAndUpdate(
      { _id: _findId },
      {
        $push: {
          [`modalities.${_type}.records`]: obj,
        },
        $set: {
          [`modalities.${_type}.name`]: _type,
        },
      },
      { returnDocument: "after" }
    );

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

async function getConquestsUser({ id }) {
  try {
    const result = {};
    const { modalities } = await User.findById({ _id: id });
    const { running, walking, cycling } = modalities;
    const categories = ["elevation", "distance", "speed"];

    // =======================================
    // - ORDERING FROM GREATEST TO SMALLEST -
    // =======================================

    //            CYCLING CATEGORY
    if (cycling) {
      console.log("Have cycling");
      const conquestCycling = cycling.records;

      result.cycling.distance = sortBetterPositions(
        conquestCycling,
        "distance"
      )[0];
      result.cycling.speed = sortBetterPositions(conquestCycling, "speed")[0];
      result.cycling.elevation = sortBetterPositions(
        conquestCycling,
        "elevation"
      )[0];
    }

    //            WALKING CATEGORY
    if (walking) {
      console.log("Have walking");
      const conquestWalking = walking.records;

      result.walking.distance = sortBetterPositions(
        conquestWalking,
        "distance"
      )[0];

      result.walking.speed = sortBetterPositions(conquestWalking, "speed")[0];

      result.walking.elevation = sortBetterPositions(
        conquestWalking,
        "elevation"
      )[0];
    }

    //            RUNNING CATEGORY
    if (running) {
      console.log("Have running");
      const conquestRunning = running.records;

      result.running.distance = sortBetterPositions(
        conquestRunning,
        "distance"
      )[0];
      result.running.speed = sortBetterPositions(conquestRunning, "speed")[0];
      result.running.elevation = sortBetterPositions(
        conquestRunning,
        "elevation"
      )[0];
    }

    console.log("_________RESULT__________");
    console.log(result);

    return { result };
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
  getConquestsUser,
};

function toMilliseconds(_time) {
  return new Date(_time);
}

function sortBetterPositions(_array, _category) {
  return _array.sort((training1, training2) =>
    training1[`${_category}`] >= training2[`${_category}`] ? -1 : 1
  );
}
