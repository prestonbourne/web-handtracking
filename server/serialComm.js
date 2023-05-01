const { SerialPort } = require("serialport");
const { state }=  require("./state");

 function serialComm(){
 try {
   const port = new SerialPort({
     path: "/dev/cu.usbmodem14101",
     baudRate: 9600,
   });

   port.on("open", () => {
     console.log(
       "Serial Port succesfully opened",
       "baudRate: " + port.baudRate
     );

     function sendData() {
       if (state.lightStatus) {
         port.write(Number(1).toString());
       } else {
         port.write(Number(0).toString());
       }
     }
     setInterval(sendData, 250);
   });

   port.on("close", () => {
     clearInterval(intervalId);
   });
 } catch (error) {
   console.log(error);
 }
}

module.exports = serialComm;