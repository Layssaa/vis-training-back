import bcrypt from "bcrypt";

const EncryptData = async (_token, _email) => {
  const saltRounds = 10;
  const token = _token + _email;
  const { hash, salt } = await MadeHashPassword(token, saltRounds);
  return { hash, salt };
};

const MadeHashPassword = async (_token, _saltRounds) => {
  try {
    const salt = await bcrypt.genSalt(_saltRounds);
    const hash = await bcrypt.hash(_token, salt);
    return { hash, salt };
  } catch (err) {
    console.log(err);
    return err;
  }
};

const AuthenticateUser = async (_token, _email, _hash) => {
  const passwordVerify = _token + _email;
  return await bcrypt.compare(passwordVerify, _hash);
};

export { EncryptData, AuthenticateUser };
