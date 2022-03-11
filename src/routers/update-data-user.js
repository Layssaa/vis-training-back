import { updateDataUserController } from "../controllers/update-data-user.js";
import { router } from "./router.js";

router.put("/update", updateDataUserController);

export { router };
