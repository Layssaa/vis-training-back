const { registerController } = require("../controllers/register-user");
const { router } = require("./router");

router.post("/register", registerController);


module.exports = { router };
