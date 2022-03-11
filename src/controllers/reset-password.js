import { resetPasswordUseCase } from "../usecase/reset-password.js";

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
    res.send({ msg: error.message, status: 401 });
  }
}

export { resetPassword };
