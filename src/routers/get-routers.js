import { getRoutersController } from "../controllers/get-routers.js";
import { router } from "./router.js";

router.get("/routers", getRoutersController);

export { router };
