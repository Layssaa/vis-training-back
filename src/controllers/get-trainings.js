import { getTrainingsUsecase } from "../usecase/get-trainings.js";
import { responseStatus, responseMessages } from "../constants/index.js";

async function getTrainingsController(req, res) {
  const { from, to, modality, token } = req.query;

  try {
    const { status, data, error } = await getTrainingsUsecase({
      from,
      to,
      modality,
      token,
    });

    if (status !== responseStatus.ok) {
      res.status(status).send({ error });
    } else {
      res.status(status).send({ data });
    }

  } catch (error) {
    console.log(error);
    res.status(responseStatus.internal_server_error).send({ error: responseMessages.internal_server_error });
  }
}

export { getTrainingsController };
