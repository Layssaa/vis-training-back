import { updateUserDataMongoDB } from "../repositories/mongo-connect.js";
import { responseStatus, authErrors } from "../constants/index.js";
import { getDataRedis, setDataRedis } from "../repositories/redis-connect.js";

async function updateDataUserUsecase({ updates, token }) {

  try {
    if (Object.keys(updates).find((elem) => elem == "password")) {
      throw new Error(authErrors.it_is_not_possible_to_update_the_password_for_now_via_this_route);
    }

    const userIdentity = await getDataRedis(`use-${token}`);
    if (!userIdentity) throw new Error(authErrors.no_token_provided);

    const { updated, error } = await updateUserDataMongoDB({
      updates,
      id: userIdentity.id,
    });

    console.log(updated);

    if (error) {
      throw new Error(authErrors.could_not_update_data);
    }

    await setDataRedis(`data::user::${token}`, {
        result: updated
      })

    return {
      data: updated,
      status: responseStatus.ok,
    };
  } catch (error) {
    console.log(error);

    return {
      status: responseStatus.not_found,
      error: error.message,
    };
  }
}

export { updateDataUserUsecase };
