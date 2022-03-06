const {
  redefinePasswordController,
} = require("../controllers/redefine-password");
const { resetPassword } = require("../controllers/reset-password");
const { verifyFields } = require("../middlewares/verify-fields");
const { router } = require("./router");

router.post("/forgot-password", verifyFields, redefinePasswordController);
router.post("/password-reset", verifyFields, resetPassword);

module.exports = { router };
