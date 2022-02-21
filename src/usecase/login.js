const { findMongoose } = require("../repositories/find-mongoose");
const { getDataRedis } = require("../repositories/get-redis");
const { setDataRedis } = require("../repositories/set-redis");

async function loginUsecase(_user) {
  const { email, password } = _user;
  let dataUser;

  try {
    const ifUserLogged = await getDataRedis(`use-${_user.email}`);

    if (!ifUserLogged) {
      dataUser = await findMongoose({ email: email });

      if (!dataUser) return (dataUser = "User not found");

      if (dataUser[0].password != password) {
        throw new Error("Incorrect data");
      }

      await setDataRedis(`use-${_user.email}`, _user);
    }

    return { data: ifUserLogged || dataUser[0] };
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { loginUsecase };
