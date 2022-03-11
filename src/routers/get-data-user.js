import { getDataController } from "../controllers/get-data-user.js";
import { router } from "./router.js";

router.get("/user", getDataController);

export { router };
