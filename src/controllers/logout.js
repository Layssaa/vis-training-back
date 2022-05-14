import { logoutUsecase } from "../usecase/logout.js";
import { responseStatus, responseMessages } from "../constants/index.js";

async function logoutController(req, res) {
  const token = req.headers.authorization;

  try {
    const { status, error } = await logoutUsecase(token);

    if (status !== responseStatus.ok) {
      // criar log de errors
      res.status(status).send({ error });
    } else {
      res.status(status).end();
    }
  } catch (error) {
    // criar log de errors
    console.log(error);

    res
      .status(responseStatus.internal_server_error)
      .send({ error: responseMessages.internal_server_error });
  }
}

export { logoutController };
