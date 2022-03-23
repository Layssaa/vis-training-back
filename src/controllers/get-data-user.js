import { getDataUsecase } from "../usecase/get-data-user.js";
import { responseStatus, responseMessages } from "../constants/index.js";

async function getDataController(req, res) {
  const { token } = req.params;
  try {
    const { status, data, error } = await getDataUsecase({ token });

    if (status !== responseStatus.ok) {
      // criar log de errors
      res.status(status).send({ error });
    } else {
      res.status(status).send({ data });
    }
  } catch (error) {
    // criar log de errors
    console.log(error);

    res
      .status(responseStatus.internal_server_error)
      .send({ error: responseMessages.internal_server_error });
  }
}

export { getDataController };
