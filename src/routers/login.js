import { loginController } from "../controllers/login.js";
import { verifyFields } from "../middlewares/verify-fields.js";
import { router } from "./router.js";

router.post("/login", verifyFields, loginController);

export { router };
