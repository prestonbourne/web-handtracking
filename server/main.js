const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const routes = require("./routes.js");
const dotenv = require("dotenv");

(async function main() {
  const port = 443;
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static("public"));
  app.use(express.json());

  app.use(cors({ origin: true }));
  app.use("/", routes);

  const server = http.createServer(app);

  server.listen(port, () => {
    console.log("running on port " + port);
  });

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });


  

  io.on('connection', socket => {
    socket.on('message', (data) => {
      console.log(data)
      io.emit('finger_coords', data)
    })

    
  })

})();
