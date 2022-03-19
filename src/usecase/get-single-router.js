import { getDataRedis } from "../repositories/redis-connect.js";
import { findUserMongoDB } from "../repositories/mongo-connect.js";

async function getSingleRouterUsecase({ token, IdRouter, modality }) {
  try {
    const { id } = await getDataRedis(`use-${token}`);
    console.log(id);

    if (!id) throw new Error("No token provided.");

    const userFind = await findUserMongoDB({ _id: id });
    
    // const obj = userObj.modalities[0][modality];

    console.log("objeto encontrado");
    console.log(records);

    // const { name, records } = modalities[0][modality];
    //find(router => router.id === IdRouter);

    // isso vai mudar
    return { data: "mock" };
  } catch (error) {
    return { error };
  }
}

export { getSingleRouterUsecase };
