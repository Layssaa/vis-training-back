const express = require("express");
const app = express();

const { _getData } = require("./routers/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", _getData);

module.exports = app;
