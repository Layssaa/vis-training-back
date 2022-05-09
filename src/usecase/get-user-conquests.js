import { getConquestsUser } from "../repositories/mongo-connect.js";

async function getConquestsUsecase({ id }) {
  try {
    const {result, error } = await getConquestsUser({ id });


    if(error) throw new Error(error);

    return {
      data: result,
    };
  } catch (error) {
    return { error };
  }
}

export { getConquestsUsecase };
