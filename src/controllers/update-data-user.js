import { responseStatus, responseMessages } from "../constants/index.js";
import { updateDataUserUsecase } from "../usecase/update-data-user.js";

async function updateDataUserController(req, res) {
  // const { token } = req.body;
  const token = req.headers.authorization;
  delete req.body.token;

  const updates = req.body;

  try {
    const { status, data, error } = await updateDataUserUsecase({
      updates,
      token,
    });

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

export { updateDataUserController };
