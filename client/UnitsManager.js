import * as THREE from "three";
import { generateRandFloat, generateRandInt } from "./utils/helpers";

class UnitsManager {
  constructor() {
    this.activeObjects = new THREE.Group();
    this.material = new THREE.MeshLambertMaterial();
  }

  start() {
    
    this._handleAddObjects();
  }

  get randomGeometry() {
    const geometry = new THREE.BoxGeometry(
      generateRandFloat(0.3, 0.6),
      generateRandFloat(0.3, 0.6),
      1
    );

    return geometry;
  }

  get randomMaterial() {
    const colors = [
      THREE.Color.NAMES.cyan,
      THREE.Color.NAMES.blueviolet,
      THREE.Color.NAMES.yellow,
      THREE.Color.NAMES.blue,
      THREE.Color.NAMES.hotpink,
      THREE.Color.NAMES.greenyellow,
    ];
    const randomIdx = Math.floor(generateRandInt(0, colors.length - 1));

    this.material.color = new THREE.Color(colors[randomIdx])
  
   
    return this.material;
  }

  _spawnCube() {
    const newCube = new THREE.Mesh(this.randomGeometry, this.randomMaterial);
    newCube.position.setX(generateRandInt(-2, 2));

    newCube.position.setY(generateRandInt(1, 2));
    newCube.position.setZ(-12);

    this.activeObjects.add(newCube);
  }

  handleAnimateObjects(deltaTime) {
    this.activeObjects.children.forEach((obj, i) => {
      obj.position.z += 5 * deltaTime;
    });
  }

  _handleAddObjects() {
    setInterval(this._spawnCube.bind(this), 2400);
  }

  handleRemoveObjects() {
    this.activeObjects.children.forEach((obj) => {
      if (obj.position.z >= 8) {
        this.activeObjects.remove(obj);
      }
    });
  }
}

export const unitsManager = new UnitsManager();
