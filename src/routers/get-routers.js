const { getRoutersController } = require("../controllers/get-routers");
const { router } = require("./router");

router.get("/routers", getRoutersController);

module.exports = { router };
