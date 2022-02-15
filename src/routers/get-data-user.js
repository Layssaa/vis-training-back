const { getDataController } = require("../controllers/get-data-user");
const { router } = require("./router");

router.get("/user", getDataController);

module.exports = { router };
