import { getRoutersUsecase } from "../usecase/get-routers.js";
import * as e from "../constants/index.js"

async function getRoutersController(req, res) {
  const { token, modality } = req.params;

  try {
    const { data, error } = await getRoutersUsecase({ token, modality });

    if (error) throw new Error(error);
    res.status(200).send(data);
  } catch (error) {
    res.status(200).send({ status: 400, msg: e.systemErros.could_not_find_any_route });
  }
}

export { getRoutersController };
