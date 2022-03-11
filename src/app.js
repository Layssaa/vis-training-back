import app from "./server.js";
import { PORT } from "./config/index.js";
import https from "https";


app.listen(PORT || 3030, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT || 3030);
});

// https
//   .createServer(app)
//   .listen(PORT | 3030, ()=>{
//     console.log('server is runing at port', PORT)
//   });
