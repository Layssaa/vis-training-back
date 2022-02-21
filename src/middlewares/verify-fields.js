async function verifyFields(req, res, next) {
  const findUndefined = Object.entries(req.body).filter(
    ([_, value]) => value === ""
  );

  if (findUndefined.length !== 0)
    return res
      .status(200)
      .send({ status: "400", msg: "All information must be completed" });

  next();
}

module.exports = { verifyFields };
