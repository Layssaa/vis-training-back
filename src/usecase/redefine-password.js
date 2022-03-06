const { findUserMongoDB } = require("../repositories/mongo-connect");
const { setSessionRedis } = require("../repositories/redis-connect");
const { createToken } = require("../utils/auth-jwt");
const mailer = require("../config/mailer");

async function redefinePasswordUsecase(email) {
  try {
    const ifUserExist = await findUserMongoDB({ email });

    if (!ifUserExist) throw new Error("User not found");

    const { token } = await createToken(email);
    
    await setSessionRedis(`session:reset-password:${token}`, ifUserExist.id);

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

module.exports = { redefinePasswordUsecase };
