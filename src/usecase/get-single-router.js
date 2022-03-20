import { getDataRedis, setDataRedis } from "../repositories/redis-connect.js";
import { findUserMongoDB } from "../repositories/mongo-connect.js";

async function getSingleRouterUsecase({ token, IdRouter, modality }) {
  try {
    const { id } = await getDataRedis(`use-${token}`);

    if (!id) throw new Error("No token provided.");

    const searchRedis = await getDataRedis(
      `router:${token}:${modality}:${IdRouter}`
    );

    if (searchRedis) {
      return { data: searchRedis.result };
    }

    const userFind = await findUserMongoDB({ _id: id });

    const records = userFind.modalities[modality].records.id(IdRouter);
    const { name } = userFind.modalities[modality];

    await setDataRedis(`router:${token}:${modality}:${IdRouter}`, {
      result: {
        name,
        records,
      },
    });

    return { data: { name, records } };
  } catch (error) {
    return { error };
  }
}

export { getSingleRouterUsecase };
