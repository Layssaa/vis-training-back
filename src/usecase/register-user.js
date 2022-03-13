import {
  findUserMongoDB,
  insertUserMongoDB,
} from "../repositories/mongo-connect.js";
import { setDataRedis } from "../repositories/redis-connect.js";
import { encryptData } from "../utils/auth.js";

async function registerUsecase({ name, email, password, repeat_password }) {
  try {
    if (password !== repeat_password)
      throw new Error("The passwords are different.");

    const result = await findUserMongoDB({ email: email });

    if (result)
      throw new Error("User already exists.");

    const { hash } = await encryptData(password, email);

    const insertData = await insertUserMongoDB({ name, email, password: hash });

    await setDataRedis(`use-${email}`, { id: insertData.id });

    return { data: "User registered successfully!" };
  } catch (error) {
    console.log(error);

    return { error };
  }
}

export { registerUsecase };
