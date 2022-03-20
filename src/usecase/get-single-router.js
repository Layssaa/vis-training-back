import { getDataRedis, setDataRedis } from "../repositories/redis-connect.js";
import { findUserMongoDB } from "../repositories/mongo-connect.js";
import * as e from "../constants/index.js";

async function getSingleRouterUsecase({ token, IdRouter, modality }) {
  try {
    const userIdentity = await getDataRedis(`use-${token}`);

    if (!userIdentity) throw new Error(e.authErrors.no_token_provided);

    const result  = await getDataRedis(
      `router:${token}:${modality}:${IdRouter}`
    );

    if (result.records) {
      return { data: result };
    }

    const userFind = await findUserMongoDB({ _id: userIdentity.id });

    const records = userFind.modalities[modality].records.id(IdRouter);
    const { name } = userFind.modalities[modality];

    if(!records){
      throw new Error(e.systemErros.could_not_find_this_route)
    }

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
