import { getEvolutionController } from "../controllers/get-evolution-data.js";
import { router } from "./router.js";

router.get("/evolution", getEvolutionController);

export { router };
