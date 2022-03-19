import { registerTrainingController } from "../controllers/register-training.js";
import { verifyUndefinedFields } from "../middlewares/verify-undefined-fields.js";
import { router } from "./router.js";

router.post("/register-training", verifyUndefinedFields, registerTrainingController);

export { router };
