import { findUserMongoDB } from "../repositories/mongo-connect.js";
import { getDataRedis, setDataRedis } from "../repositories/redis-connect.js";
import { authenticateUser, createToken } from "../utils/index.js";
import { responseMessages, responseStatus } from "../constants/index.js";

//Falta fazer
// - jwt
async function loginUsecase(_user, _token) {
  const { email, password } = _user;
  const token = _token;
  
  let dataUser;

  try {
    const ifUserLogged = await getDataRedis(`use-${token}`);

    if (!ifUserLogged) {
      dataUser = await findUserMongoDB({ email: email });

      if (!dataUser)
        return {
          status: responseStatus.not_found,
          error: responseMessages.user_not_found,
        };

      if (Object.keys(dataUser)?.length === 0)
        return {
          status: responseStatus.not_found,
          error: responseMessages.user_not_found,
        };

      if (!(await authenticateUser(password, email, dataUser.password)))
        return {
          status: responseStatus.forbidden,
          error: responseMessages.invalid_password,
        };

      const { token } = createToken(
        `${ifUserLogged?.id || dataUser._id}:${email}:${new Date().getTime()}`
      );

      await setDataRedis(`use-${token}`, {
        id: dataUser._id,
        email: dataUser.email,
        token: token,
      });

      return {
        status: responseStatus.ok,
        data: {
          id: dataUser._id,
          email: dataUser.email,
          token: token,
        },
      };
    }

    return {
      status: responseStatus.ok,
      data: ifUserLogged,
    };
  } catch (error) {
    console.log(error);

    return {
      status: responseStatus.internal_server_error,
      error: responseMessages.internal_server_error,
    };
  }
}

export { loginUsecase };
