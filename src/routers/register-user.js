import { registerController } from "../controllers/register-user.js";
import { verifyUndefinedFields } from "../middlewares/verify-undefined-fields.js";
import { router } from "./router.js";

router.post("/register", verifyUndefinedFields, registerController);

export { router };
