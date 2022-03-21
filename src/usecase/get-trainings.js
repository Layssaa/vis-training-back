import { getDataRedis } from "../repositories/redis-connect.js";
import { findByDate } from "../repositories/mongo-connect.js";
import * as e from "../constants/index.js";

async function getTrainingsUsecase({ from, to, modality, token }) {
  try {
    const userIdentity = await getDataRedis(`use-${token}`);
    if (!userIdentity) throw new Error(e.authErrors.no_token_provided);

    if (!from || !to || !modality || !token) {
      throw new Error(e.authErrors.invalid_filters);
    }

    const { result } = await findByDate({
      from,
      to,
      modality,
      id: userIdentity.id,
    });

    if (result.length === 0) {
      throw new Error(e.systemErros.we_could_not_find_any_workouts);
    }

    return { data: result };
  } catch (error) {
    return { error };
  }
}

export { getTrainingsUsecase };
