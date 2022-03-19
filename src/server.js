import express from "express";
import cors from "cors";
import { NODE_ENV } from "./config/index.js";
import {
  _getData,
  _getEvolution,
  _getRouters,
  _getTraining,
  _login,
  _password,
  _registerUser,
  _updateData,
  _getConquests,
  _registerTraining
} from "./routers/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (NODE_ENV === "development")
  app.use((req, res, next) => {
    console.log("==> ", req.url);
    next();
  });
  
// ---------- ROUTERS ------------
app.use(_getData);
app.use(_getEvolution);
app.use(_getRouters);
app.use(_getTraining);
app.use(_login);
app.use(_password);
app.use(_registerUser);
app.use(_updateData);
app.use(_getConquests);
app.use(_registerTraining);

export default app;
