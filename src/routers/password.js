import { redefinePasswordController } from "../controllers/redefine-password.js";
import { resetPassword, verifyToken } from "../controllers/reset-password.js";
import { verifyUndefinedFields } from "../middlewares/verify-undefined-fields.js";
import { router } from "./router.js";

router.post("/forgot-password", verifyUndefinedFields, redefinePasswordController);
router.post("/verify-token", verifyToken)
router.post("/password-reset", verifyUndefinedFields, resetPassword);

export { router };
