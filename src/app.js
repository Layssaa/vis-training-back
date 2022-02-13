const app = require("./Server");
const PORT = process.env.PORT || 4000;

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});