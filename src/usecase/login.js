import { findUserMongoDB } from "../repositories/mongo-connect.js";
import { getDataRedis, setDataRedis } from "../repositories/redis-connect.js";
import { authenticateUser } from "../utils/auth.js";

//Falta fazer
// - jwt
async function loginUsecase(_user) {
  const { email, password } = _user;
  let dataUser;

  try {
    const ifUserLogged = await getDataRedis(`use-${email}`);

    if (!ifUserLogged) {
      dataUser = await findUserMongoDB({ email: email });
      console.log(dataUser);
      if (dataUser.length == 0 || !dataUser) throw new Error("User not found");

      if (!(await authenticateUser(password, email, dataUser.password))) {
        throw new Error("Incorrect data");
      }

      await setDataRedis(`use-${email}`, { id: dataUser.id });
    }

    return { data: ifUserLogged || dataUser };
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { loginUsecase };
