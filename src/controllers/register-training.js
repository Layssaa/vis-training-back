import { registerTrainingUseCase } from "../usecase/register-training.js";

async function registerTrainingController(req, res) {
  // nesse token precisa vir o email, por hora
  const { token, name, records } = req.body;
  // name: 'cycling'
  // records: {
  //id---mongo
  //route-name: 'Tal rota XX'
  //date: we 20 fev 2021 17h
  //distance:  0000
  // time : 180000000
  //speed: 23,5
  //elevation_gain: 200
  //   };

  try {
    const { data, error } = await registerTrainingUseCase({
      token,
      name,
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
