const { redefinePasswordController } = require("../controllers/redefine-password");
const { router } = require("./router");

router.post("/password-reset", redefinePasswordController);
// router.post("/password-reset/:id/:token", redefinePasswordController);


module.exports = { router };
