import { getDataRedis } from "../repositories/redis-connect.js";
import { findByDate } from "../repositories/mongo-connect.js";
import { responseStatus, responseMessages, authErrors, systemErros } from "../constants/index.js";
import * as e from "../constants/index.js";

async function getTrainingsUsecase({ from, to, modality, token }) {
  try {
    const userIdentity = await getDataRedis(`use-${token}`);
    if (!userIdentity) throw new Error(authErrors.no_token_provided);

    if (!from || !to || !modality || !token) {
      throw new Error(authErrors.invalid_filters);
    }

    const { result } = await findByDate({
      from,
      to,
      modality,
      id: userIdentity.id,
    });

    if (result.length === 0) {
      throw new Error(systemErros.we_could_not_find_any_workouts);
    }

    return {
      status: responseStatus.ok,
      data: result,
    };
  } catch (error) {

    return {
      status: responseStatus.not_found,
      error: error.message,
    };
  }
}

export { getTrainingsUsecase };
