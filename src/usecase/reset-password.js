import { findUserMongoDB } from "../repositories/mongo-connect.js";
import { getDataRedis } from "../repositories/redis-connect.js";
import { EncryptData, AuthenticateUser } from "../utils/auth.js";
import { authenticJWT } from "../utils/auth-jwt.js";

async function resetPasswordUseCase({
  token,
  redefined_password,
  repeat_password,
}) {
  try {
    // --------------- GET SESSION ON REDIS -----------------
    const { id } = await getDataRedis(`session:reset-password:${token}`);
    if (!id) throw new Error("Expired token");

    if (repeat_password !== redefined_password)
      throw new Error("The passwords are different");

    // ---------------- AUTHENTIC JWT TOKEN -----------------
    const { auth } = await authenticJWT(token);

    if (!auth) throw new Error("Invalid token.");

    // --------------- GET USER ON MONGO -----------------
    const user = await findUserMongoDB({ id });

    if (!user) throw new Error("User not found");

    // --------------- ENCRYPT NEW PASSWORD -----------------
    const { hash } = await EncryptData(redefined_password, user.email);

    // --------------- VERIFY IF THE NEW PASSWORD IS THE SAME AS THE OLD -----------------
    if (await AuthenticateUser(redefined_password, user.email, user.password))
      throw new Error("Try a different password than the previous one.");

    // ----------------- INSERT NEW DATA -----------------
    user.password = hash;
    user.updated_At = new Date().toString();
    await user.save();

    return { data: "Updated password." };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export { resetPasswordUseCase };
