import { responseStatus, responseMessages } from "../constants/index.js";

async function verifyUndefinedFields(req, res, next) {
  const findUndefined = Object.entries(req.body).filter(
    ([_, value]) => value === ""
  );

  if (findUndefined.length !== 0)
    return res
      .status(responseStatus.bad_request)
      .send({
        status: responseStatus.bad_request,
        msg: responseMessages.all_information_must_be_completed
      });

  next();
}

export { verifyUndefinedFields };
