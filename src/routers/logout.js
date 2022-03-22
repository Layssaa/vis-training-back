import { logoutController } from "../controllers/logout.js";
import { checkSession } from "../middlewares/index.js";
import { router } from "./router.js";

router.post("/logout", checkSession, logoutController);

export { router };
