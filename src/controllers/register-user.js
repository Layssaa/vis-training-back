const { registerUsecase } = require("../usecase/register-user");

async function registerController(req, res) {
  console.log("TRY REGISTER USER!");
  const { email, password, repeat_password } = req.body;

  try {
    const { data, error } = await registerUsecase({
      email,
      password,
      repeat_password,
    });

    console.log("Data received:");
    console.log(data);

    if (error) throw new Error(error);
    
  } catch (error) {
    console.log("ERROR");
    console.log(error.message);
    res.status(200).send({ status: 400, msg: error.message });
  }
}

module.exports = { registerController };
