const { getEvolutionController } = require("../controllers/get-evolution-data");
const { router } = require("./router");

router.get("/evolution", getEvolutionController);


module.exports = { router };
