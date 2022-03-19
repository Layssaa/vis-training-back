import { getRoutersController } from "../controllers/get-routers.js";
import { router } from "./router.js";

router.get("/routers/:token/:modality", getRoutersController);

export { router };
