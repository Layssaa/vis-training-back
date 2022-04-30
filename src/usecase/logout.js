import { deleteSessionRedis } from "../repositories/redis-connect.js";
import { responseMessages, responseStatus } from "../constants/index.js";

//Falta fazer
// - jwt
async function logoutUsecase(_user) {
  const { token } = _user;

  try {
    await deleteSessionRedis(`use-${token}`);

    return {
      status: responseStatus.ok,
    };
  } catch (error) {
    console.log(error);

    return ({
      status: responseStatus.internal_server_error,
      error: responseMessages.internal_server_error,
    });
  }
}

export { logoutUsecase };
