const { SerialPort } = require("serialport");
const { state }=  require("./state");



   const port = new SerialPort({
     path: "/dev/cu.usbmodem14101",
     baudRate: 9600,
   });

   

   port.on("open", () => {
     console.log(
       "Serial Port succesfully opened",
       "baudRate: " + port.baudRate
     );

   });


   function sendData(data) {
     
    if(!!data === false) {
      return
    }
    port.write(data)
  
  }

  
   setInterval((data) => sendData(data), 250);

   port.on("close", () => {
     clearInterval(intervalId);
   });



module.exports = {sendData};