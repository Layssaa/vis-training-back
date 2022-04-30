import { getConquestsUser } from "../repositories/mongo-connect.js";

async function getConquestsUsecase({ id }) {
  try {
    const findUser = await getConquestsUser({ id });

    if (!findUser) throw new Error("User not found");

    return {
      data: findUser.result,
    };
  } catch (error) {
    console.log("_________ERROR__________");
    console.log(error);
    return { error };
  }
}

export { getConquestsUsecase };
