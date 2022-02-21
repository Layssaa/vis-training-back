const { findMongoDB } = require("../repositories/find-mongoose");
const { getDataRedis } = require("../repositories/get-redis");
const { setDataRedis } = require("../repositories/set-redis");
const { AuthenticateUser } = require("../utils/auth");

//Falta fazer
// - jwt

async function loginUsecase(_user) {
  const { email, password } = _user;
  let dataUser;

  try {
    const ifUserLogged = await getDataRedis(`use-${email}`);

    if (!ifUserLogged) {
      dataUser = await findMongoDB({ email: email });

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
