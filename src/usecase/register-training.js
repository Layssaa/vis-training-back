import * as e from "../constants/index.js";
import { updateDataMongoDB } from "../repositories/mongo-connect.js";
import { getDataRedis, setDataRedis } from "../repositories/redis-connect.js";

async function registerTrainingUseCase({ name, token, records }) {

  try {
    const { id } = await getDataRedis(`use-${token}`);

    if (!id) throw new Error(e.user_not_found);

    // Updated into mongodb - New data
    const { updated, error } = await updateDataMongoDB(
      name,
      id,
      records
    );

    await setDataRedis(`data::user::${token}`, {
      result: updated
    })

    if (error) {
      throw new Error(e.an_error_occurred_while_sending);
    }

    return { data: "Training registered successfully!" };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export { registerTrainingUseCase };
