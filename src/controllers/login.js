import { loginUsecase } from "../usecase/login.js";
import { responseStatus, responseMessages } from "../constants/index.js";

async function loginController(req, res) {
  try {
    const { status, data, error } = await loginUsecase(req.body);

    if (status !== responseStatus.ok) {
      // criar log de errors
      res.status(status).send({ error });
    } else {
      res.status(status).send({ data });
    };
  } catch (error) {
    // criar log de errors
    console.log(error);

    res.status(responseStatus.internal_server_error).send({ error: responseMessages.internal_server_error });
  }
}

export { loginController };
