import mongoose from "mongoose";
import { MONGO_URI } from "../config/index.js";

mongoose.connect(MONGO_URI);

export { mongoose };
