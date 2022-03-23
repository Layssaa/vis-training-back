import { authErrors, responseStatus } from "../constants/index.js";
import { findUserMongoDB } from "../repositories/mongo-connect.js";
import {
  getDataRedis,
  setDataWithTimestamp,
} from "../repositories/redis-connect.js";

async function getDataUsecase({ token }) {
  try {
    const userDataCache = await getDataRedis(`data::user::${token}`);

    if (userDataCache) {
      return {
        status: responseStatus.ok,
        data: userDataCache.result,
      };
    }

    const userIdentity = await getDataRedis(`use-${token}`);
    if (!userIdentity) throw new Error(authErrors.no_token_provided);

    const userFounded = await findUserMongoDB({ _id: userIdentity.id });

    await setDataWithTimestamp(
      `data::user::${token}`,
      {
        result: userFounded,
      },
      60
    );
    
    return {
      status: responseStatus.ok,
      data: userFounded,
    };
  } catch (error) {
    console.log(error);
    return {
      status: responseStatus.not_found,
      error: error.message,
    };
  }
}

export { getDataUsecase };
