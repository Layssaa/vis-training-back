import { registerUsecase } from "../usecase/register-user.js";

async function registerController(req, res) {
  const { name, email, password, repeat_password } = req.body;

  try {
    const { data, error } = await registerUsecase({
      name,
      email,
      password,
      repeat_password,
    });

    if (error) throw new Error(error);

    res.status(200).send({ data });
  } catch (error) {
    console.log(error.message);
    res.status(200).send({ status: 400, msg: error.message });
  }
}

export { registerController };
