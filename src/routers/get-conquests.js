import { getConquestsController } from "../controllers/get-user-conquests.js";
import { router } from "./router.js";

router.get("/conquests/:id", getConquestsController);

export { router };
