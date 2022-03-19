import { getDataRedis } from "../repositories/redis-connect.js";
import { findUserMongoDB } from "../repositories/mongo-connect.js";

import * as e from "../constants/index.js";

async function getRoutersUsecase({ token, modality }) {
  console.log("GET ROUTERS USE CASE");

  try {
    const { id } = await getDataRedis(`use-${token}`);
    console.log(id);

    if (!id) throw new Error("No token provided.");

    const { modalities } = await findUserMongoDB({ _id: id });

    // isso vai mudar
    return { data: modalities[0][modality] };
  } catch (error) {
    return { error };
  }
}

export { getRoutersUsecase };
