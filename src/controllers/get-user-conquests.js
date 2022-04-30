import { responseStatus } from "../constants/index.js";
import { getConquestsUsecase } from "../usecase/get-user-conquests.js";

async function getConquestsController(req, res) {
  const { id } = req.params;

  try {
    const { data, error } = await getConquestsUsecase({ id });

    if (error) throw new Error("Not found.");

    res
      .send({
        data,
      })
      .status(responseStatus.ok);
  } catch (error) {
    res
      .send({
        message: "Not found, try again.",
      })
      .status(responseStatus.not_found);
  }
}

export { getConquestsController };
