const express = require("express");
const app = express();

const { _getData, _login, _registerUser } = require("./routers/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res) => {
  console.log("==> ",req.url);
});

app.use(_login);
app.use(_getData);
app.use(_registerUser);

module.exports = app;
