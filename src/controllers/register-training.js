import { registerTrainingUseCase } from "../usecase/register-training.js";

async function registerTrainingController(req, res) {
  // nesse token precisa vir o email, por hora
  const { token, records, name } = req.body;

  try {
    const { data, error } = await registerTrainingUseCase({
      name,
      token,
      records,
    });

    if (error) throw new Error(error);

    res.send({ msg: data });
  } catch (error) {
    console.log(error);
    res.send({ msg: error.message, status: 401 });
  }
}

export { registerTrainingController };
