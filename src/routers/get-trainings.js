const { getTrainingsController } = require("../controllers/get-trainings");
const { router } = require("./router");

router.get("/trainings", getTrainingsController);

module.exports = { router };
