import {HandLandmarker, FilesetResolver} from "@mediapipe/tasks-vision"
import model from './hand_landmarker.task'

const vision = await FilesetResolver.forVisionTasks(
 // path/to/wasm/root
 "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
);
const handLandmarker = await HandLandmarker.createFromOptions(
   vision,
   {
     baseOptions: {
       modelAssetPath: model
     },
     numHands: 1,
     runningMode: "VIDEO"
   });

 
export default handLandmarker;