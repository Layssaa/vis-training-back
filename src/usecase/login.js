const { findUserMongoDB } = require("../repositories/mongo-connect");
const { getDataRedis, setDataRedis } = require("../database/redis");
const { AuthenticateUser } = require("../utils/auth");

async function loginUsecase(_user) {
  const { email, password } = _user;
  let dataUser;

  try {
    const ifUserLogged = await getDataRedis(`use-${email}`);

    if (!ifUserLogged) {
      dataUser = await findUserMongoDB({ email: email });

      if (dataUser.length == 0) throw new Error("User not found");

      if (!(await AuthenticateUser(password, email, dataUser[0].password))) {
        throw new Error("Incorrect data");
      }

      await setDataRedis(`use-${email}`, _user);
    }

    return { data: ifUserLogged || dataUser[0] };
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { loginUsecase };

//Falta fazer
// - jwt
