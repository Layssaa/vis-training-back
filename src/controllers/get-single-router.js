import { getSingleRouterUsecase } from "../usecase/get-single-router.js";

async function getSingleRouterController(req, res) {
  const { token, IdRouter, modality } = req.params;

  try {
    const { data, error } = await getSingleRouterUsecase({ token, IdRouter, modality });

    if (error) throw new Error(error);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: 400, msg: "Could not find this route" });
  }
}

export { getSingleRouterController };
