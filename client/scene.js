import * as THREE from "three";
import handData from "./store";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';





let camera, scene, renderer, controls;
(function initScene(){

  camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
 scene = new THREE.Scene();
 renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight / 1.2);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls( camera, renderer.domElement );
window.addEventListener( 'resize', () => {
 camera.aspect = window.innerWidth / window.innerHeight;
 camera.updateProjectionMatrix();

 renderer.setSize( window.innerWidth, window.innerHeight / 1.2 );
}, false );


})()







const geometry = new THREE.BoxGeometry(.1, .1, .1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 , wireframe:true});

 
const cubes = [];
let areCubesAdded = false;
 function manageHand(){

  const { landmarks} = handData
  
 

    if(areCubesAdded === false && landmarks.length > 0){
     for (let i = 0; i < landmarks.length; i++) {
      const cube =  new THREE.Mesh(geometry, material);
      cubes.push(cube)
      scene.add(cube);

     }
    areCubesAdded = true
    }


    if (landmarks.length  > 0 && areCubesAdded === true) {

     for (let i = 0; i < landmarks.length; i++) {
      
      const currLndmrk = landmarks[i]; 

      const vector = new THREE.Vector3(currLndmrk.x * 2 - 1, -currLndmrk.y * 2 + 1, currLndmrk.z * 10);
    
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      dir.setX(-dir.x)
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      
     
      cubes[i].position.copy(pos)
      
    
     }}
   }
  


// var cube = [];

// for (let i = 0; i < 3; i++) {
//  cube[i] = new THREE.Mesh(geometry, material);
//  cube[i].position.y = i;
//  scene.add(cube[i])
 
// }
// const test =  new THREE.Mesh(geometry, material);
// test.position.x = 6
// scene.add(test);
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

//const cube = new THREE.Mesh(geometry, material);
//scene.add(cube);

camera.position.z = 8;

function animate() {
 manageHand();
 renderer.render(scene, camera);
 requestAnimationFrame(animate);
}

animate();
