import { getSingleRouterUsecase } from "../usecase/get-single-router.js";
import * as e from "../constants/index.js";

async function getSingleRouterController(req, res) {
  const { token, IdRouter, modality } = req.params;

  try {
    const { data, error } = await getSingleRouterUsecase({
      token,
      IdRouter,
      modality,
    });

    if (error) throw new Error(error);
    res.status(200).send(data);
  } catch (error) {
    res
      .status(200)
      .send({ status: e.responseStatus.bad_request, msg: error.message });
  }
}

export { getSingleRouterController };
