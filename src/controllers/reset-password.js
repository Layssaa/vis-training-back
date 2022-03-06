const { resetPasswordUseCase } = require("../usecase/reset-password");

async function resetPassword(req, res) {
  const { email, token, redefined_password, repeat_password } = req.body;

  try {
    const { data, error } = await resetPasswordUseCase({
      email,
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

module.exports = { resetPassword };
