import { findUserMongoDB } from "../repositories/mongo-connect.js";
import { getDataRedis, setDataRedis } from "../repositories/redis-connect.js";
import { authenticateUser } from "../utils/auth.js";

import { responseMessages, responseStatus } from "../constants/index.js";

//Falta fazer
// - jwt
async function loginUsecase(_user) {
  const { email, password } = _user;
  let dataUser;

  try {
    const ifUserLogged = await getDataRedis(`use-${email}`);

    if (!ifUserLogged) {
      dataUser = await findUserMongoDB({ email: email });

      if (!dataUser)
        return ({
          status: responseStatus.not_found,
          error: responseMessages.user_not_found,
        });

      if (Object.keys(dataUser)?.length === 0)
        return ({
          status: responseStatus.not_found,
          error: responseMessages.user_not_found,
        });

      if (!(await authenticateUser(password, email, dataUser.password)))
        return ({
          status: responseStatus.forbidden,
          error: responseMessages.invalid_password,
        });

      await setDataRedis(`use-${email}`, { id: dataUser._id });
    }

    return {
      status: responseStatus.ok,
      data: ifUserLogged || { id: dataUser._id },
    };
  } catch (error) {
    console.log(error);

    return ({
      status: responseStatus.internal_server_error,
      error: responseMessages.internal_server_error,
    });
  }
}

export { loginUsecase };
