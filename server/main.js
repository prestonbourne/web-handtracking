const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes.js");
const dotenv = require("dotenv");
const { SerialPort } = require("serialport");
const { state, Light } = require("./state.js");

const ARDUINO = "Arduino LLC";

(async function main() {
  createExpressApp();

  try {
    // const port = new SerialPort({
    //   path: "/dev/cu.usbmodem14301",
    //   baudRate: 9600,
    // });

    // port.on("open", () => {
    //   console.log(
    //     "Serial Port succesfully opened",
    //     "baudRate: " + port.baudRate
    //   );

    //   function sendData() {
    //     if (state.lightStatus) {
    //       port.write(Number(1).toString());
    //     } else {
    //       port.write(Number(0).toString());
    //     }
    //   }
    //   setInterval(sendData, 250);
    // });

    // port.on("close", () => {
    //   clearInterval(intervalId);
    // });
  } catch (error) {
    console.log(error);
  }
})();


function createExpressApp() {
  const port = process.env.PORT || 3001;
  const app = express();
  console.log(port);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static("public"));
  app.use(express.json());
  app.use(cors());
  app.use("/", routes);

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
  return app;
}
