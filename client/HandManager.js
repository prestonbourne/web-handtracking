import { Events } from "./utils/constants";
import { gameManger } from "./GameManager";
import { landmarkStore } from "./LandmarkStore";
import * as THREE from "three";
import { unitsManager } from "./UnitsManager";

class HandManager {
  constructor() {
    this.landmarks = [];
    this.arrowGroup = new THREE.Group();
    this.rayGroup = [];

   
    this.geometry =  new THREE.SphereGeometry(0.15)
    this.material = new THREE.MeshNormalMaterial()

    this.handMesh = new THREE.InstancedMesh(this.geometry, this.material, 21);
  }

  getPositionAt(index) {
    const matrix = new THREE.Matrix4();
    this.handMesh.getMatrixAt(index, matrix);
    return new THREE.Vector3().setFromMatrixPosition(matrix);
  }

  get indexFingertip() {
    const indexPosition = this.getPositionAt(9);
    return indexPosition;
  }

  get raysAdded() {
    return this.rayGroup.length === 21;
  }

  _updateLandsMarks() {
    const handle = () => {
      this.landmarks = landmarkStore.landmarks;
    };

    window.addEventListener(Events.LandmarksUpdate, handle.bind(this));
  }

  _handleRaycasters() {
    if (!this.raysAdded) {
      for (let index = 0; index < this.landmarks.length; index++) {
        const raycaster = new THREE.Raycaster();
        const position = this.getPositionAt(index);
        raycaster.set(position, new THREE.Vector3(0, 0, -1).normalize());
        this.rayGroup.push(raycaster);
      }
    } else {
      for (let index = 0; index < this.rayGroup.length; index++) {
        const position = this.getPositionAt(index);

        this.rayGroup[index].set(
          position,
          new THREE.Vector3(0, 0, -1).normalize()
        );
      }
    }
  }

  _handleArrows() {
    if (this.debugMode === false) {
      this.arrowGroup.clear();
      return;
    }

    if (this.raysAdded === false) {
      return;
    }

    this.arrowGroup.clear();
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

  _handleCollisions() {
    if (!this.raysAdded) return;
    if (!gameManger.isPlaying) return;

    this.rayGroup.forEach((ray) => {
      const intersects = ray.intersectObjects(
        unitsManager.activeObjects.children
      );

      intersects.forEach((intersection) => {
        if (intersection.distance <= 1) {
          window.dispatchEvent(
            new CustomEvent(Events.HandCollision, {
              detail: intersection.object,
            })
          );
        }
      });
    });
  }

  _placeCubesByLandmark(camera) {
    for (let index = 0; index < this.landmarks.length; index++) {
      const currLndmrk = this.landmarks[index];

      const vector = new THREE.Vector3(
        currLndmrk.x * 2 - 1,
        -currLndmrk.y * 2 + 1,
        currLndmrk.z
      ).unproject(camera);

      const dir = vector.sub(camera.position).normalize();
      dir.setX(-dir.x);
      const distance = -camera.position.z / dir.z; //<- this maps hands z coordinate to cameras z coordinate
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      const quaternion = new THREE.Quaternion();

      quaternion.setFromEuler(new THREE.Euler());

      const matrix = new THREE.Matrix4();
      matrix.makeRotationFromQuaternion(quaternion);
      matrix.setPosition(pos);

      this.handMesh.setMatrixAt(index, matrix);
      this.handMesh.instanceMatrix.needsUpdate = true;
    }
  }

  render(camera, debugMode) {
    this.debugMode = debugMode;

    this._placeCubesByLandmark(camera);
    this._handleCollisions();
    this._handleRaycasters();
    this._handleArrows();
  }
}

export const handManager = new HandManager();
