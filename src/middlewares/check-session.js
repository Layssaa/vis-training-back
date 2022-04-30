import jwt from "jsonwebtoken";
import { responseStatus, responseMessages } from "../constants/index.js";
import { authenticJWT } from "../utils/index.js";
import { getDataRedis } from "../repositories/index.js";

async function checkSession(req, res, next) {
  const token = req.headers.authorization;

  try {
    const { auth, status, error } = await authenticJWT(token);

    if (!auth) {
      // criar log de errors
      res.status(status).send({ error });
      return;
    } else {
      
      // ------------ CHANGE TO USE TOKEN ----------------
      // const email = jwt.decode(token)._token.split(":")[1];

      const userSession = await getDataRedis(`use-${token}`);
      if (!userSession) {
        res
          .status(responseStatus.forbidden)
          .send({ error: responseMessages.expired_token });

        return;
      }

      if (token !== userSession?.token) {
        res
          .status(responseStatus.forbidden)
          .send({ error: responseMessages.invalid_token });

        return;
      }

      next();
      return;
    }
  } catch (error) {
    // criar log de errors
    console.log(error);

    res
      .status(responseStatus.internal_server_error)
      .send({ error: responseMessages.internal_server_error });

    return;
  }
}

export { checkSession };
