const { registerController } = require("../controllers/register-user");
const { verifyFields } = require("../middlewares/verify-fields");
const { router } = require("./router");

router.post("/register", verifyFields, registerController);


module.exports = { router };
