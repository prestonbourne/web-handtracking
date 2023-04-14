const { SerialPort } = require("serialport");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const routes = require("./routes");
const { state, LIGHT } = require("./state");


const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
app.use(cors())
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

(function main() {
  const path = "/dev/cu.usbmodem14201";
  const baudRate = 9600;
  const port = new SerialPort({ path, baudRate });

  port.on("open", () => {
    console.log("Serial Port succesfully opened", "baudRate: " + port.baudRate);
    

    function sendData(){
      if (state.lightStatus) {
      
        port.write(Number(1).toString())
      }
      else{
       
        port.write(Number(0).toString())
      }

    }



    setInterval(sendData, 250);


});


  



  port.on("close", () => {
    clearInterval(intervalId);
  });
})();
