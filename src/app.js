const app = require("./Server");
const { PORT } = require("./config/index");

app.listen(PORT || 3030, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT || 3030);
});
