import { getSingleRouterUsecase } from "../usecase/get-single-router.js";
import * as e from "../constants/index.js";


async function getSingleRouterController(req, res) {
  const { token, IdRouter, modality } = req.params;

  try {
    const { data, error } = await getSingleRouterUsecase({ token, IdRouter, modality });

    if (error) throw new Error(error);
    res.status(200).send(data);
  } catch (error) {
    res.status(200).send({ status: 400, msg: e.systemErros.could_not_find_this_route });
  }
}

export { getSingleRouterController };
