import jwt from "jsonwebtoken";
import { SECRET } from "../config/index.js";

const createToken = async (_token) => {
  const token = await jwt.sign({ _token }, SECRET, {
    expiresIn: "3600s",
  });

  return { token };
};

async function authenticJWT(_token) {
  if (!_token) throw new Error("No token provided.");

  try {
    jwt.verify(_token, SECRET, (err) => {
      if (err) throw new Error(err);
    });

    return { auth: true };
  } catch (error) {
    return { auth: false };
  }
}

export { createToken, authenticJWT };
