import { redefinePasswordUsecase } from "../usecase/redefine-password.js";

async function redefinePasswordController(req, res) {
  const { email } = req.body;

  try {
    const { data, error } = await redefinePasswordUsecase(email);

    if (error) throw new Error(error);

    res.send({ msg: data });
  } catch (error) {
    console.log(error);
    res.send({ msg: error.message, status: 401 });
  }
}

export { redefinePasswordController };
