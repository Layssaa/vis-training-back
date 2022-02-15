const { loginController } = require("../controllers/login");
const { router } = require("./router");

router.post("/login", loginController);

module.exports = { router };
