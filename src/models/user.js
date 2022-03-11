import { mongoose } from "../database/connection.js";
const Schema = mongoose.Schema;

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
  create_At: {
    type: Date,
    default: Date.now(),
  },
  updated_At: {
    type: Date,
  },
  deleted_At: {
    type: Date,
  },
});

const User = mongoose.model("User", UserModel);

export { User };
