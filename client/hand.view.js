import { UPDATE_LANDMARKS_EVENT } from "./utils/constants";
import handData from "./hand.model";
import * as THREE from "three";

class HandCubes {
  constructor() {
    this.debugMode = false;
    this.cubes = [];
    this.landmarks = [];
    this.arrowGroup = new THREE.Group();
    this.rayGroup = [];

    this._updateLandsMarks();
  }

  get _cubesAdded() {
    return this.cubes.length === 21;
  }

  get raysAdded() {
    return this.rayGroup.length === 21;
  }

  createCubes(geometry, material) {
    if (this._cubesAdded === true) {
      console.warn("Cubes already exist");
      return;
    }

    for (let index = 0; index < 21; index++) {
      const cube = new THREE.Mesh(geometry, material);
      this.cubes.push(cube);
    }
  }

  addCubesToScene(scene) {
    if (!this._cubesAdded) {
      console.log(this.cubes.length);
      console.error("add cubes first");
    }
    this.cubes.forEach((cube) => {
      scene.add(cube);
    });
  }

  _updateLandsMarks() {
    const handle = () => {
      this.landmarks = handData.landmarks;
    };
    handle.bind(this);
    window.addEventListener(UPDATE_LANDMARKS_EVENT, handle);
  }

  _createRaycasters(scene) {
    if (!this._cubesAdded || this.raysAdded) return;

    this.cubes.forEach((cube) => {
      const raycaster = new THREE.Raycaster();
      raycaster.set(cube.position, new THREE.Vector3(0, 0, 1).normalize());
      this.rayGroup.push(raycaster);
    });
  }

  _handleArrows() {
    if (this.debugMode === false) {
      return;
    }

    this.rayGroup.forEach((raycaster) => {
      const arrow = new THREE.ArrowHelper(
        raycaster.ray.direction,
        raycaster.ray.origin,
        300,
        0xff0000
      );

      this.arrowGroup.add(arrow);
    });

   
 
  }

  _sendCollision() {
    // console.log("Sending Data");
  }

  _handleCollisions(scene) {
    if (!this._cubesAdded && !this.raysAdded) return;

    this.debugMode && this.arrowGroup.clear();

    this.rayGroup.forEach((ray) => {
      const intersects = ray.intersectObjects(scene.children);

      if (intersects.length && this._cubesAdded) {
        this._sendCollision();
      }
    });
  }

  render(camera, scene, debugMode) {
    if (this._cubesAdded === false) {
      throw new Error("add cubes first. createCubes method");
    }

    this.debugMode = debugMode;
    this._createRaycasters(scene);
    // this._handleArrows();
    // this._handleCollisions(scene);

    for (let index = 0; index < this.landmarks.length; index++) {
      const currLndmrk = this.landmarks[index];

      const vector = new THREE.Vector3(
        currLndmrk.x * 2 - 1,
        -currLndmrk.y * 2 + 1,
        currLndmrk.z * 10
      );

      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      dir.setX(-dir.x);
      //   const distance = -camera.position.z / dir.z; <- leave comment, this maps hands z coordinate to cameras z coordinate
      const pos = camera.position.clone().add(dir);
      this.cubes[index].position.copy(pos);
    }
  }
}

const handCubes = new HandCubes();

export default handCubes;
