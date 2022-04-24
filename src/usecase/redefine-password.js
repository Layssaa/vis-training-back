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

    // mailer.sendMail(
    //   {
    //     to: email,
    //     from: "lay@gmail.com",
    //     subject: "Recovery password",
    //     template: "./forgot_password",
    //     context: { token },
    //   },
    //   (err) => {
    //     console.log(err);
    //     if (err) throw new Error(err.message);
    //   }
    // );

    return { data: "Recovery email sent!" };
  } catch (error) {
    console.log(error);

    return { error };
  }
}

export { redefinePasswordUsecase };
