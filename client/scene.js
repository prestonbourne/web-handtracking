import * as THREE from "three";
import handData from "./hand.model";
import handCubes from "./hand.view";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { postData } from "./utils/helpers";

let camera, scene, renderer, controls;
(function initScene() {
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
  const controls = new OrbitControls(camera, renderer.domElement);
  window.addEventListener(
    "resize",
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight / 1.2);
    },
    false
  );
})();

/**
 *
 * @param { THREE.Vector3} origin
 * @param {THREE.Vector3} dir
 */

const geometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cubes = [];
let areCubesAdded = false;
function manageHand() {
  const { landmarks } = handData;

  if (areCubesAdded === false && landmarks.length > 0) {
    for (let i = 0; i < landmarks.length; i++) {
      const cube = new THREE.Mesh(geometry, material);
      cubes.push(cube);
      scene.add(cube);
    }
    areCubesAdded = true;
  }

  if (landmarks.length > 0 && areCubesAdded === true) {
    for (let i = 0; i < landmarks.length; i++) {
      const currLndmrk = landmarks[i];

      const vector = new THREE.Vector3(
        currLndmrk.x * 2 - 1,
        -currLndmrk.y * 2 + 1,
        currLndmrk.z * 10
      );

      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      dir.setX(-dir.x);
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir);
      // const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      cubes[i].position.copy(pos);
    }
  }
}

const rays = [];
let areRaysAdded = false;
let sentOnce = false;
const rayParent = new THREE.Group();
scene.add(rayParent);
function manageRaycasters() {
  if (!areCubesAdded) return;

  if(!areRaysAdded){
  cubes.forEach((cu) => {
  
      const raycaster = new THREE.Raycaster();
      raycaster.set(cu.position, new THREE.Vector3(0, 0, 1).normalize());

      const arrow = new THREE.ArrowHelper(
        raycaster.ray.direction,
        raycaster.ray.origin,
        300,
        0xff0000
      );

      rayParent.add(arrow);

      rays.push({
        raycaster: raycaster,
        arrow: arrow,
      });
    
     
    scene.add(rayParent);
  })
  areRaysAdded = true
}

console.log(rays.length)
  if (areCubesAdded && rays.length === 21) {
    rayParent.clear();
    
   
    for (let index = 0; index < rays.length; index++) {
      
      const currRaycaster = rays[index].raycaster.ray;

      const intersects = rays[index].raycaster.intersectObjects(scene.children);
  
      console.log(intersects.length)
      if (intersects.length) {
       
        if (sentOnce === false) {
         // postData({ status: true });
         console.log('touch')
          sentOnce = true;
        }
      }
     
      currRaycaster.origin = cubes[index].position;
  
      const arrow = new THREE.ArrowHelper(
        currRaycaster.direction,
        currRaycaster.origin,
        300,
        0xff0000
      );
  
      rayParent.add(arrow);
    }
  

   

  }
}

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.z = 8;

// Create a cube mesh
const test = new THREE.Mesh(geometry, material);
const test2 = new THREE.Mesh(geometry, material);
test.scale.set(10, 10, 10);
test.position.z = 8;
test2.scale.set(15, 15, 15);
test2.position.z = 12;
test.position.x += 2;
//test.scale = new THREE.Vector3(5,5,5)
// Add the cube mesh to the scene
scene.add(test);
scene.add(test2);

  handCubes.createCubes(geometry, material);
  handCubes.addCubesToScene(scene);
  scene.add(handCubes.arrowGroup);
 
(function animate() {
//  manageHand();
//  manageRaycasters()
   handCubes.render(camera, scene, true)
 
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  // Rotate the cube mesh
  test.rotation.x += 0.01;
  test.rotation.y += 0.01;
})();
