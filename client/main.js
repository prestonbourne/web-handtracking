import handLandmarker from "./landmarker";
import {drawConnectors, drawLandmarks, } from "@mediapipe/drawing_utils"
import {HAND_CONNECTIONS} from "@mediapipe/hands"
import handData from "./store";

(function main(){

const video = document.getElementById("webcam");
const canvasElement = document.getElementById("output_canvas");
const canvasCtx = canvasElement.getContext("2d");
const enableWebcamButton = document.getElementById("webcamButton");
let webcamRunning = false;

let removeLater = false

const inoButton = document.getElementById("ino");
inoButton.addEventListener("click", (e) => {

  removeLater = !removeLater
  

  fetch('http://localhost:3001/', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "status": `${removeLater}`  })
})
   .then(response => response.json())
   .then(response => console.log(JSON.stringify(response)))
  
})


const hasGetUserMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)

// If webcam supported, add event listener to button for when user
// wants to activate it.
if (hasGetUserMedia) {
  enableWebcamButton.addEventListener("click", function enableCam(e){
    
    if (!handLandmarker) {
      console.log("Wait! objectDetector not loaded yet.");
      return;
    }
  
    if (webcamRunning === true) {
      webcamRunning = false;
      
    } else {
     
      webcamRunning = true;
     
    }
  
    // getUsermedia parameters.
    const constraints = {
      video: true
    };
  
    // Activate the webcam stream.
   console.log( navigator.mediaDevices.getUserMedia(constraints))
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
     
      video.srcObject = stream;
      video.addEventListener("loadeddata", predictWebcam);
    }).catch((e) => {
      console.error(e.message)
    });
  });
} else {
  console.warn("getUserMedia() is not supported by your browser");
}

async function predictWebcam() {
 const videoHeight = "360px";
 const videoWidth = "480px";
  canvasElement.style.height = videoHeight;
  canvasElement.style.top = "0px"
  video.style.height = videoHeight;
  canvasElement.style.width = videoWidth;
  video.style.width = videoWidth;
  // Now let's start detecting the stream.

  let nowInMs = Date.now();
  const results = handLandmarker.detectForVideo(video, nowInMs);

  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  if (results.landmarks) {
   
    for (const landmarks of results.landmarks) {

      handData.setLandmarks(landmarks)
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 5
      });
      drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
    }
  }
  canvasCtx.restore();

  // Call this function again to keep predicting when the browser is ready.
  if (webcamRunning === true) {
    window.requestAnimationFrame(predictWebcam);
  }
}
})()