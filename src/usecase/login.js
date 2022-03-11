import { findUserMongoDB } from "../repositories/mongo-connect.js";
import { getDataRedis, setDataRedis } from "../repositories/redis-connect.js";
import { AuthenticateUser } from "../utils/auth.js";

//Falta fazer
// - jwt
async function loginUsecase(_user) {
  const { email, password } = _user;
  let dataUser;

  try {
    const ifUserLogged = await getDataRedis(`use-${email}`);

    if (!ifUserLogged) {
      dataUser = await findUserMongoDB({ email: email });

      if (dataUser.length == 0 || !dataUser) throw new Error("User not found");

      if (!(await AuthenticateUser(password, email, dataUser[0].password))) {
        throw new Error("Incorrect data");
      }

      await setDataRedis(`use-${email}`, { id: dataUser[0].id });
    }

    return { data: ifUserLogged || dataUser[0] };
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { loginUsecase };
