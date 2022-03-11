import { loginUsecase } from "../usecase/login.js";

async function loginController(req, res) {
  try {
    const { data } = await loginUsecase(req.body);

    res.status(200).send(data);
  } catch (error) {
    console.log(error);

    res.status(200).send({ status: 400, msg: error.message });
  }
}

export { loginController };
