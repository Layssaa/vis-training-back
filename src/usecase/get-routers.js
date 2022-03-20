import { getDataRedis, setDataRedis } from "../repositories/redis-connect.js";
import { findUserMongoDB } from "../repositories/mongo-connect.js";
import * as e from "../constants/index.js";

async function getRoutersUsecase({ token, modality }) {
  try {
    const { id } = await getDataRedis(`use-${token}`);

    if (!id) throw new Error(e.authErrors.no_token_provided);

    const result  = await getDataRedis(`listrouters:${token}:${modality}`);
    
    if (result) {
      return { data: result };
    }

    const { modalities } = await findUserMongoDB({ _id: id });

    if (!modalities[modality]) {
      throw new Error(e.systemErros.could_not_find_any_route);
    }

    await setDataRedis(`listrouters:${token}:${modality}`, {
      result: modalities[modality],
    });

    return {
      data: modalities[modality],
    };
  } catch (error) {
    return { error };
  }
}

export { getRoutersUsecase };
