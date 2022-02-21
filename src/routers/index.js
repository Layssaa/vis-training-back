const _getData = require("./get-data-user");
const _getEvolution = require("./get-evolution-data");
const _getRouters = require("./get-routers");
const _getTraining = require("./get-trainings");
const _login = require("./login");
const _password = require("./password");
const _registerUser = require("./register-user");
const _updateData = require("./update-data-user");
const _getConquests = require("./get-conquests");

module.exports = {
  _getData: _getData.router,
  _getEvolution: _getEvolution.router,
  _getRouters: _getRouters.router,
  _getTraining: _getTraining.router,
  _login: _login.router,
  _password: _password.router,
  _registerUser: _registerUser.router,
  _updateData: _updateData.router,
  _getConquests: _getConquests.router,
};
