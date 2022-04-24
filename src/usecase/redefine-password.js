import { findUserMongoDB } from "../repositories/mongo-connect.js";
import { sendMail } from "../config/mailer.js";

async function redefinePasswordUsecase(email) {
  try {
    //  ---------- VERIFY IF USER EXIST ----------
    const ifUserExist = await findUserMongoDB({ email });

    if (!ifUserExist) throw new Error("User not found");

    //  ---------- SEND TOKEN TO RESET PASSWORD ----------
    sendMail({
      email,
      name: ifUserExist.name,
      type: "recoveryPassword",
      id: ifUserExist.id,
    });

    return { data: "Recovery email sent!" };
  } catch (error) {
    console.log(error);

    return { error };
  }
}

export { redefinePasswordUsecase };
