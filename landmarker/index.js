import {HandLandmarker, FilesetResolver} from "@mediapipe/tasks-vision"

const vision = await FilesetResolver.forVisionTasks(
 // path/to/wasm/root
 "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
);
const handLandmarker = await HandLandmarker.createFromOptions(
   vision,
   {
     baseOptions: {
       modelAssetPath: "landmarker/hand_landmarker.task"
     },
     numHands: 1
   });

 
export default handLandmarker;