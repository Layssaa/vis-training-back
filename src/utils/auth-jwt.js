import jwt from "jsonwebtoken";
import { SECRET } from "../config/index.js";
import { authExpiresTimes, responseMessages, responseStatus } from "../constants/index.js";

function createToken(_token) {
  const token = jwt.sign({ _token }, SECRET, {
    expiresIn: authExpiresTimes.jwt_tokens,
  });

  return { token };
};

async function authenticJWT(_token) {
  if (!_token) return {
    auth: false,
    status: responseStatus.forbidden,
    error: responseMessages.not_token_provide,
  };

  try {
    await verifyJWT(_token);

    return {
      auth: true,
    };
  } catch (error) {
    if (error?.auth === false) {
      return {
        auth: false,
        status: error.status,
        error: error.error,
      };
    };

    return {
      auth: false,
      status: responseStatus.internal_server_error,
      error: responseMessages.internal_server_error,
    };
  }
};

async function verifyJWT(_token) {
  return new Promise((resolve, reject) => {
    jwt.verify(_token, SECRET, (err) => {
      // TODO: criar log de erro
      if (err) reject({
          auth: false,
          status: responseStatus.forbidden,
          error: responseMessages.invalid_token,
        });
      
      resolve();
    });
  });
};

export { createToken, authenticJWT };
