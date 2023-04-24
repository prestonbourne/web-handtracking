import { UPDATE_LANDMARKS_EVENT } from "./utils/constants";
import handData from "./hand.model";
import * as THREE from "three";

class HandCubes {
  constructor() {
 
    this.cubes = [];
    this.landmarks = [];
    this._updateLandsMarks()
  }

  get cubesAdded() {
    return this.cubes.length === 21;
  }

  createCubes(geometry, material) {
    if (this.cubesAdded === true) {
      console.warn("Cubes already exist");
      return;
    }

    for (let index = 0; index < 21; index++) {
      const cube = new THREE.Mesh(geometry, material);
      this.cubes.push(cube);
    }
  }

  addCubesToScene(scene) {
    if (!this.cubesAdded) {
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

  render(camera) {
    if (!this.cubesAdded) {
      throw new Error("Cubes not ready, use create cubes method first");
    }

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
