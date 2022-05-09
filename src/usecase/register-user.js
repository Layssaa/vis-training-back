import { responseStatus } from "../constants/response-status.js";
import {
  findUserMongoDB,
  insertUserMongoDB,
} from "../repositories/mongo-connect.js";
import { setDataRedis } from "../repositories/redis-connect.js";
import { createToken } from "../utils/auth-jwt.js";
import { encryptData } from "../utils/auth.js";

async function registerUsecase({ name, email, password, repeat_password }) {
  try {
    if (password !== repeat_password)
      throw new Error("The passwords are different.");

    const result = await findUserMongoDB({ email: email });

    if (result) throw new Error("User already exists.");

    const { hash } = await encryptData(password, email);

    const insertData = await insertUserMongoDB({ name, email, password: hash });

    const { token } = await createToken(
      `${insertData?.id}:${email}:${new Date().getTime()}`
    );

    await setDataRedis(`use-${token}`, {
      id: insertData.id,
      email: email,
      token: token,
    });

    return {
      status: responseStatus.ok,
      data: {
        id: insertData.id,
        email: email,
        token: token,
      },
    };
  } catch (error) {
    console.log(error);

    return { error };
  }
}

export { registerUsecase };
