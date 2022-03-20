import { getDataRedis, setDataRedis } from "../repositories/redis-connect.js";
import { findUserMongoDB } from "../repositories/mongo-connect.js";

import * as e from "../constants/index.js";

async function getRoutersUsecase({ token, modality }) {
  try {
    const { id } = await getDataRedis(`use-${token}`);

    if (!id) throw new Error("No token provided.");

    const searchRedis = await getDataRedis(`listrouters:${token}:${modality}`);

    if (searchRedis) {
      console.log("redis");
      return { data: searchRedis.result };
    }

    const { modalities } = await findUserMongoDB({ _id: id });

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
