import { getRoutersController } from "../controllers/get-routers.js";
import { getSingleRouterController } from "../controllers/get-single-router.js";
import { router } from "./router.js";

router.get("/routers/:token/:modality", getRoutersController);
router.get("/router/:token/:modality/:IdRouter", getSingleRouterController);

export { router };
