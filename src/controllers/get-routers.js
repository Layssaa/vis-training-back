import { getRoutersUsecase } from "../usecase/get-routers.js";
import * as e from "../constants/index.js";

async function getRoutersController(req, res) {
  const { token, modality } = req.params;

  try {
    const { data, error } = await getRoutersUsecase({ token, modality });

    if (error) throw new Error(error);
    res.status(e.responseStatus.ok).send(data);
  } catch (error) {
    res
      .status(e.responseStatus.ok)
      .send({ status: e.responseStatus.bad_request, msg: error.message });
  }
}

export { getRoutersController };
