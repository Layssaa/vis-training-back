const { mongoose } = require("../database/connection");
const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId

const categoriesModel = new Schema({
  records: [
    {
      id: mongoose.ObjectId,
      name_route: String,
      date: Date,
      distance: Number,
      time: Number,
      elevation_gain: Number,
    },
  ],
});

const UserModel = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar_url: {
    type: String,
  },
  avatar_key: {
    type: String,
  },
  token: {
    type: String,
  },
  modalities: [
    {
      cycling: {
        categoriesModel,
      },
      walking: {
        categoriesModel,
      },
      running: {
        categoriesModel,
      },
    },
  ],
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", UserModel);

module.exports = { User };
