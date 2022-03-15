import jwt from "jsonwebtoken";
import { SECRET } from "../config/index.js";
import { authExpiresTimes, authErrors } from "../constants/index.js";

function createToken(_token) {
  const token = jwt.sign({ _token }, SECRET, {
    expiresIn: authExpiresTimes.jwt_tokens,
  });

  return { token };
};

async function authenticJWT(_token) {
  if (!_token) throw new Error(authErrors.no_token_provided);

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
