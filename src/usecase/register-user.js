const {
  findUserMongoDB,
  insertUserMongoDB,
} = require("../repositories/mongo-connect");
const { setDataRedis } = require("../repositories/redis-connect");
const { EncryptData } = require("../utils/auth");

async function registerUsecase({ name, email, password, repeat_password }) {
  try {
    if (password !== repeat_password)
      throw new Error("The passwords are different.");

    const result = await findUserMongoDB({ email: email });

    if (result.length !== 0) throw new Error("User already exists.");

    const { hash } = await EncryptData(password, email);

    const insertData = await insertUserMongoDB({ name, email, password: hash });

    await setDataRedis(`use-${email}`, { id: insertData.id });

    return { data: "User registered successfully!" };
  } catch (error) {
    console.log(error);

    return { error };
  }
}

module.exports = { registerUsecase };
