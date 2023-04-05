import * as THREE from "three";
import store from "./store";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.autoClear = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(.1, .1, .1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 , wireframe:true});

// for (let index = 0; index < store.get("landmarks").length; index++) {
//  const element = array[index];

// }


 
  const cubes = [];
  let areCubesAdded = false;
 function manageHand(){

  const landmarks = store.get("landmarks");


    if(areCubesAdded === false && landmarks.length > 0){
     for (let i = 0; i < landmarks.length; i++) {
      cubes[i] = new THREE.Mesh(geometry, material);
      scene.add(cubes[i]);

     }
    areCubesAdded = true
  
    }


    if (landmarks.length  > 0 && areCubesAdded === true) {

     for (let i = 0; i < landmarks.length; i++) {
      
      cubes[i].position.x = landmarks[i].x * 3;
      cubes[i].position.y = landmarks[i].y * 3;
      cubes[i].position.z = landmarks[i].z * 3;
    
     }}
   }
  


// var cube = [];

// for (let i = 0; i < 3; i++) {
//  cube[i] = new THREE.Mesh(geometry, material);
//  cube[i].position.y = i;
//  scene.add(cube[i])
 
// }


//const cube = new THREE.Mesh(geometry, material);
//scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

 manageHand()
 
 console.log(scene.children.length);
  renderer.render(scene, camera);
  //renderer.clear();
}

animate();
