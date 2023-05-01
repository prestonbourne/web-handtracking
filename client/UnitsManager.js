import * as THREE from "three";
import { generateNumberBetween } from "./utils/helpers";

class UnitsManager {
  constructor() {
    this.activeObjects = new THREE.Group();
  }

  start() {
    this._handleAddObjects();
  }

  get randomGeometry() {
    const geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);

    return geometry;
  }

  get randomMaterial() {
    const wireframeRed = new THREE.MeshBasicMaterial({
      color: "red",
    });
    const wireframeGreen = new THREE.MeshBasicMaterial({
      color: "green",
    });

    const wireFrameBlue = new THREE.MeshBasicMaterial({
      color: "blue",
    });

    const materials = [wireframeRed, wireframeGreen, wireFrameBlue];

    const randomIdx = Math.floor(
      generateNumberBetween(0, materials.length - 1)
    );

    const randomMat = materials[randomIdx];

    return randomMat;
  }

  _spawnCube() {
    const newCube = new THREE.Mesh(this.randomGeometry, this.randomMaterial);
    newCube.position.setX(generateNumberBetween(-1, 1));
    newCube.position.setY(generateNumberBetween(1, 2));
    newCube.position.setZ(-12);

    this.activeObjects.add(newCube);
  }

  handleAnimateObjects(deltaTime) {
  
    this.activeObjects.children.forEach((obj) => {
     
    
     
      obj.position.z += 0.01 + deltaTime;
    });
  }

  _handleAddObjects() {
  
    setInterval(this._spawnCube.bind(this), 2000);
  }

  _handleRemoveObjects() {
    this.activeObjects.children.forEach((obj) => {
      if (obj.position.z >= 12) {
        this.activeObjects.remove(obj);
      }
    });
  }
}

export const unitsManager = new UnitsManager();
