import { registerController } from "../controllers/register-user.js";
import { verifyFields } from "../middlewares/verify-fields.js";
import { router } from "./router.js";

router.post("/register", verifyFields, registerController);

export { router };
