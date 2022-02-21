const { loginController } = require("../controllers/login");
const { verifyFields } = require("../middlewares/verify-fields");
const { router } = require("./router");

router.post("/login", verifyFields, loginController);

module.exports = { router };
