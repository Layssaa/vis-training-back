import { loginController } from "../controllers/login.js";
import { verifyUndefinedFields } from "../middlewares/verify-undefined-fields.js";
import { router } from "./router.js";

router.post("/login", verifyUndefinedFields, loginController);

export { router };
