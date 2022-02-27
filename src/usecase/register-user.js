const {
  findUserMongoDB,
  insertUserMongoDB,
} = require("../repositories/mongo-connect");

async function registerUsecase({ email, password, repeat_password }) {
  console.log("USER CASE REGISTER!");
  console.log("----- DATA USER -----");
  console.log(email);
  console.log(password);
  console.log(repeat_password);

  try {
    if (password !== repeat_password)
      throw new Error("The passwords are different.");

    const rows = await findUserMongoDB({ email: email });

    console.log("---- RESULT -----");
    console.log(rows);

    if (rows) return Error("User already exists.");

    // await insertUserMongoDB({ email, password });

    return { data: "User registered successfully!" };
  } catch (error) {
    console.log(error);

    return { error };
  }
}

module.exports = { registerUsecase };
