import { findUserMongoDB } from "../repositories/mongo-connect.js";
import { setSessionRedis } from "../repositories/redis-connect.js";
import { createToken } from "../utils/auth-jwt.js";
import mailer from "../config/mailer.js";

async function redefinePasswordUsecase(email) {
  try {
    const ifUserExist = await findUserMongoDB({ email });

    if (!ifUserExist) throw new Error("User not found");

    const { token } = await createToken(email);

    await setSessionRedis(`session:reset-password:${token}`, {
      id: ifUserExist.id,
    });

    mailer.sendMail(
      {
        to: email,
        from: "lay@gmail.com",
        template: "./forgot_password",
        context: { token },
      },
      (err) => {
        console.log(err);
        if (err) throw new Error(err.message);
      }
    );

    return { data: "Recovery email sent!" };
  } catch (error) {
    console.log(error);

    return { error };
  }
}

export { redefinePasswordUsecase };
