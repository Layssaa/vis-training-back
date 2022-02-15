async function getDataController(req, res) {
  console.log("GET DATA");
  res.send("data");
}

module.exports = { getDataController };
