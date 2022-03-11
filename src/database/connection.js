import mongoose from "mongoose";
import { MONGO_HOST } from "../config/index.js";

mongoose.connect(MONGO_HOST);

export { mongoose };
