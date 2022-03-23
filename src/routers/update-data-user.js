import { updateDataUserController } from "../controllers/update-data-user.js";
import { verifyUndefinedFields } from "../middlewares/verify-undefined-fields.js";
import { router } from "./router.js";

router.put("/update", verifyUndefinedFields, updateDataUserController);

export { router };
