import { authErrors, systemErros, responseStatus } from "../constants/index.js";
import { getDataRedis } from "../repositories/redis-connect.js";
import { getEvolutionMongoDB } from "../repositories/mongo-connect.js"

async function getEvolutionUsecase({ modality, token }) {
  try {
    const userIdentity = await getDataRedis(`use-${token}`);

    if (!userIdentity) throw new Error(authErrors.no_token_provided);

    if (!modality) {
      throw new Error(systemErros.invalid_modality);
    }

    const { result } = await getEvolutionMongoDB({
        modality,
        id: userIdentity.id,
      });

      if (result.length === 0) {
        throw new Error(systemErros.there_are_not_enough_records_to_analyze_the_evolution);
      }
  
      return {
        status: responseStatus.ok,
        data: result,
      };

  } catch (error) {
    console.log(error);

    return {
      status: responseStatus.not_found,
      error: error.message,
    };
  }
}

export { getEvolutionUsecase };
