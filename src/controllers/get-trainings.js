import { getTrainingsUsecase } from "../usecase/get-trainings.js";

async function getTrainingsController(req, res) {
  const { from, to, modality, token } = req.query;

  try {
    const { data, error } = await getTrainingsUsecase({ from, to, modality, token });

    if (error) throw new Error(error);

    res.status(200).send(data);
  } catch (error) {
      console.log(error);
    res.status(200).send(error.message);
  }
}

export { getTrainingsController };
