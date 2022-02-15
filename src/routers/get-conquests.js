const { getConquestsController } = require("../controllers/get-user-conquests");
const { router } = require("./router");

router.get("/conquests", getConquestsController);

module.exports = { router };
