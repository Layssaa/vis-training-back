import { User } from "../models/index.js";

async function findUserMongoDB(_obj) {
  return await User.findOne({ ..._obj });
}

async function insertUserMongoDB(_obj) {
  return await User.create(_obj);
}

async function updateDataMongoDB(_type, _find, _obj) {
  const switchModality = {
    cycling: function (_obj) {
      return {
        cycling: { $push: { records: _obj } },
      };
    },
    walking: function (_obj) {
      return {
        walking: { $push: { records: _obj } },
      };
    },
    running: function (_obj) {
      return {
        running: { $push: { records: _obj } },
      };
    },
  };

  const modality = await switchModality[_type](_obj);

  if (!modality) throw Error("Invalid category");
  console.log(_find, modality);

  return await User.findOneAndUpdate(
    { id: _find },
    {
      modalities: {
        modality,
      },
    },
    {
      returnOriginal: false,
    },
    (err, doc) => (err ? console.log(err) : console.log(doc))
  );
}

export { findUserMongoDB, insertUserMongoDB, updateDataMongoDB };
