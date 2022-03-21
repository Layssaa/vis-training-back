import { getDataRedis } from "../repositories/redis-connect.js";
import * as e from "../constants/index.js";
import { findByDate } from "../repositories/mongo-connect.js";

async function getTrainingsUsecase({ from, to, modality, token }) {
  try {
    const userIdentity = await getDataRedis(`use-${token}`);
    if (!userIdentity) throw new Error(e.authErrors.no_token_provided);

    if (!from || !to || !modality || !token) {
      throw new Error("Invalid filters");
    }

    const result = await findByDate({ from, to, modality, id: userIdentity.id });

    if(result.length === 0){
      throw new Error("We couldn't find any workouts with these filters.")
    }

    return { data : result}
  } catch (error) {
    return { error };
  }
}

export { getTrainingsUsecase };
