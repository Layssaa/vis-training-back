const { redefinePasswordController } = require("../controllers/redefine-password");
const { router } = require("./router");

router.post("/password", redefinePasswordController);


module.exports = { router };
