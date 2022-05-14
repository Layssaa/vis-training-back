import { findUserMongoDB } from "../repositories/mongo-connect.js";
import {
  deleteSessionRedis,
  getDataRedis,
} from "../repositories/redis-connect.js";
import { encryptData, authenticateUser } from "../utils/auth.js";

async function resetPasswordUseCase({
  token,
  redefined_password,
  repeat_password,
}) {
  try {
    // --------------- GET SESSION ON REDIS -----------------

    if (repeat_password !== redefined_password)
      throw new Error("The passwords are different");

    // --------------- GET USER ON MONGO -----------------
    const user = await findUserMongoDB({ id });

    if (!user) throw new Error("User not found");

    // --------------- ENCRYPT NEW PASSWORD -----------------
    const { hash } = await encryptData(redefined_password, user.email);

    // --------------- VERIFY IF THE NEW PASSWORD IS THE SAME AS THE OLD -----------------
    if (await authenticateUser(redefined_password, user.email, user.password))
      throw new Error("Try a different password than the previous one.");

    // ----------------- INSERT NEW DATA -----------------
    user.password = hash;
    user.updated_At = new Date().toString();
    await user.save();

    await deleteSessionRedis(`session:reset-password:${token}`);

    return { data: "Updated password." };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

async function verifyTokenUseCase(token) {
  try {
    // --------------- GET SESSION ON REDIS -----------------
    const { id } = await getDataRedis(`session:reset-password:${token}`);

    if (!id) throw new Error("Expired token");

    return { data: "sucess" };
  } catch (error) {
    return { error };
  }
}

export { resetPasswordUseCase, verifyTokenUseCase };
