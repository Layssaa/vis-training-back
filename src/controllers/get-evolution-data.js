import { responseMessages } from "../constants/response-messages.js";
import { responseStatus } from "../constants/response-status.js";
import { getEvolutionUsecase } from "../usecase/get-evolution-data.js";

async function getEvolutionController(req, res) {

  const { modality, token } = req.query;

  try {
    const { status, data, error } = await getEvolutionUsecase({
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
    res
      .status(responseStatus.internal_server_error)
      .send({ error: responseMessages.internal_server_error });
  }
}

export { getEvolutionController };
