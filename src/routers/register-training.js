import { registerTrainingController } from "../controllers/register-training.js";
import { verifyFields } from "../middlewares/verify-fields.js";
import { router } from "./router.js";

router.post("/register-training", verifyFields, registerTrainingController);

export { router };
