import { authErrors, systemErros } from "../constants/errors-messages.js";
import {
  resetPasswordUseCase,
  verifyTokenUseCase,
} from "../usecase/reset-password.js";

async function verifyToken(req, res) {
  const { token } = req.body;

  try {
    const { data, error } = await verifyTokenUseCase(token);

    if (error) throw new Error(authErrors.invalid_token);
    
    res.send({ msg: data });
  } catch (error) {

    res.send({
      msg: systemErros.could_not_reset_password_please_try_again,
      status: 401,
    });
  }
}

async function resetPassword(req, res) {
  const { token, redefined_password, repeat_password } = req.body;

  try {
    const { data, error } = await resetPasswordUseCase({
      token,
      redefined_password,
      repeat_password,
    });

    if (error) throw new Error(error);

    res.send({ msg: data });
  } catch (error) {
    console.log(error);
    res.send({
      msg: systemErros.could_not_reset_password_please_try_again,
      status: 401,
    });
  }
}

export { resetPassword, verifyToken };
