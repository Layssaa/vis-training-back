import { redefinePasswordController } from "../controllers/redefine-password.js";
import { resetPassword } from "../controllers/reset-password.js";
import { verifyFields } from "../middlewares/verify-fields.js";
import { router } from "./router.js";

router.post("/forgot-password", verifyFields, redefinePasswordController);
router.post("/password-reset", verifyFields, resetPassword);

export { router };
