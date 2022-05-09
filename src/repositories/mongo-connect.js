import { User } from "../models/index.js";
<<<<<<< HEAD
import * as e from "../constants/index.js";
=======
import { toMilliseconds } from "../utils/parse-time-to-milliseconds.js";
>>>>>>> 10d18a4 (create: first files)

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
  const result = {
    running: {
      distance: [],
      speed: [],
      elevation_gain: [],
    },
    walking: {
      distance: [],
      speed: [],
      elevation_gain: [],
    },
    cycling: {
      distance: [],
      speed: [],
      elevation_gain: [],
    },
  };

  try {
    const { modalities } = await User.findById({ _id: id });
    const { running, walking, cycling } = modalities;

    // =======================================
    // - ORDERING FROM GREATEST TO SMALLEST -
    // =======================================

    // // --------------- CYCLING CATEGORY ---------------
    if (cycling) {
      console.log("Have cycling");
      const conquestCycling = cycling.records;

      const betterDistance = (
        await sortBetterPositions(conquestCycling, "distance")
      )[0];

      const betterSpeed = (
        await sortBetterPositions(conquestCycling, "speed")
      )[0];
      const betterElevation = (
        await sortBetterPositions(conquestCycling, "elevation_gain")
      )[0];

      result.cycling.distance = betterDistance;
      result.cycling.speed = betterSpeed;
      result.cycling.elevation_gain = betterElevation;
    }

    // //  --------------- WALKING CATEGORY ---------------
    if (walking) {
      console.log("Have walking");
      const conquestWalking = walking.records;

      const betterDistance = (
        await sortBetterPositions(conquestWalking, "distance")
      )[0];
      const betterSpeed = (
        await sortBetterPositions(conquestWalking, "speed")
      )[0];
      const betterElevation = (
        await sortBetterPositions(conquestWalking, "elevation_gain")
      )[0];

      result.walking.distance = betterDistance;
      result.walking.speed = betterSpeed;
      result.walking.elevation_gain = betterElevation;
    }

    // //  ---------------  RUNNING CATEGORY ---------------
    if (running) {
      console.log("Have running");
      const conquestRunning = running.records;

      const betterDistance = (
        await sortBetterPositions(conquestRunning, "distance")
      )[0];
      const betterSpeed = (
        await sortBetterPositions(conquestRunning, "speed")
      )[0];
      const betterElevation = (
        await sortBetterPositions(conquestRunning, "elevation_gain")
      )[0];

      result.running.distance = betterDistance;
      result.running.speed = betterSpeed;
      result.running.elevation_gain = betterElevation;
    }

    return { result };
  } catch (error) {
    return {
      error: e.responseMessages.unable_to_access_this_months_achievements,
    };
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

async function sortBetterPositions(_array, _category) {
  const oneMonth = toMilliseconds(2628000000);
  const today = toMilliseconds(new Date());
  const after = today - oneMonth;

  // ------- FILTERING WORKOUTS FROM THE LAST MONTH -------
  return await _array
    .filter((router) => {
      if (toMilliseconds(router.date) >= after) {
        return router;
      }
    })
    .sort((training1, training2) =>
      training1[`${_category}`] >= training2[`${_category}`] ? -1 : 1
    );
}
async function getEvolutionMongoDB({ modality, id }) {
  try {
    const dateNow = new Date().toISOString();
    const oneMonth = 2628000000;
    const threeMonths = 5256000000;

    const userFounded = await User.findById({ _id: id });

    let result = userFounded.modalities[modality].records;

    result = result
      .sort((date1, date2) => {
        console.log(date1);
        console.log(date2);

        toMilliseconds(date1) >= toMilliseconds(date2) ? 1 : -1;
      })
      .slice(0, 4);

    for (let i = 0; i <= result.lenght - 1; i++) {
      console.log("_______ inside FOR ______");
      result[i].evolutionTime = countPorcent(
        result[i + 1].time,
        result[i].time
      );
      result[i].evolutionDistance = countPorcent(
        result[i + 1].distance,
        result[i].distance
      );
      result[i].evolutionElevation = countPorcent(
        result[i + 1].elevation_gain,
        result[i].elevation_gain
      );
    }
    console.log("________________RESULT_______________");
    console.log(result);

    return { result };
  } catch (error) {
    return error;
  }
}

function averageMonth(_arrayToCalc) {}

function countPorcent(_from, _to) {
  return ((_to - _from) * 100) / _from;
}

function toMilliseconds(_time) {
  return new Date(_time);
}

export {
  findUserMongoDB,
  insertUserMongoDB,
  updateDataMongoDB,
  findByDate,
  updateUserDataMongoDB,
  getEvolutionMongoDB,
};
