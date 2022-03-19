import { getDataRedis, setDataRedis } from "../repositories/redis-connect.js";
import { findUserMongoDB } from "../repositories/mongo-connect.js";

async function getSingleRouterUsecase({ token, IdRouter, modality }) {
  try {
    const { id } = await getDataRedis(`use-${token}`);

    if (!id) throw new Error("No token provided.");

    const userFind = await findUserMongoDB({ _id: id });

    const records = userFind.modalities[modality].records.id(IdRouter);

    return { data: records };
  } catch (error) {
    return { error };
  }
}

export { getSingleRouterUsecase };
