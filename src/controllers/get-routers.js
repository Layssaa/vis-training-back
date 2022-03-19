import { getRoutersUsecase } from "../usecase/get-routers.js";

async function getRoutersController(req, res) {
  console.log("GET ROUTERS");
  const { token, modality } = req.params;

  console.log(token);
  console.log(modality);

  try {
    const { data, error } = await getRoutersUsecase({ token, modality });

    if (error) throw new Error(error);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: 400, msg: "Unable to fetch your routes" });
  }
}

export { getRoutersController };
