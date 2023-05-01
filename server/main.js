const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const routes = require("./routes.js");
const dotenv = require("dotenv");
const serialComm = require("./serialComm.js");

(async function main() {
  const port = 443;
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static("public"));
  app.use(express.json());
  app.use(cors());
  app.use("/", routes);

  const server = http.createServer(app);

 server.listen(port)
  
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

 

  io.on("connection", (socket) => {
    console.log("hey", socket);
    socket.send("fuck z")
  });

  //serialComm();
})();
