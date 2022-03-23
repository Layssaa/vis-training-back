import { User } from "../models/index.js";
import { toMilliseconds } from "../utils/parse-time-to-milliseconds.js";

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

    for (let i = 0; i <= result.lenght - 1 ; i++) {
      console.log('_______ inside FOR ______');
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

function averageMonth(_arrayToCalc){
  
}

function countPorcent(_from, _to) {
  return ((_to - _from) * 100) / _from;
}

export {
  findUserMongoDB,
  insertUserMongoDB,
  updateDataMongoDB,
  findByDate,
  getEvolutionMongoDB,
};
