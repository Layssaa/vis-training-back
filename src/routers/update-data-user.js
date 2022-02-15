const { updateDataUserController } = require("../controllers/update-data-user");
const { router } = require("./router");

router.put("/update", updateDataUserController);

module.exports = { router };
