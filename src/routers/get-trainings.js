import { getTrainingsController } from "../controllers/get-trainings.js";
import { router } from "./router.js";

router.get("/trainings", getTrainingsController);

export { router };
