import * as Errors from "../constants/index.js";
import { updateDataMongoDB } from "../repositories/mongo-connect.js";
import { getDataRedis } from "../repositories/redis-connect.js";

async function registerTrainingUseCase({ token, name, records }) {
  try {
    const id  = await getDataRedis(`use-${token}`);
    
    if (!id) throw new Error("User not found!");

    console.log("id encontrado____", id);

    // Update into mongodb
    const updated = await updateDataMongoDB(name, id, records);
    console.log("updated!");
    console.log(updated);

    return { data: "Training registered successfully!" };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export { registerTrainingUseCase };
