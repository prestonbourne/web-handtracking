import * as THREE from "three";
import { generateRandFloat, generateRandInt } from "./utils/helpers";
import { scoreManager } from "./ScoreManager";

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
      THREE.Color.NAMES.magenta,
      THREE.Color.NAMES.hotpink,
      THREE.Color.NAMES.greenyellow,
    ];
    const randomIdx = Math.floor(generateRandInt(0, colors.length - 1));

   const randomMat =  new THREE.MeshLambertMaterial({color:new THREE.Color(colors[randomIdx]) })
    //this.material.color = new THREE.Color(colors[randomIdx])
  
   
    return randomMat;
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
      obj.position.z += 9 * deltaTime;
    });
  }

  _handleAddObjects() {
    setInterval(this._spawnCube.bind(this), 500);
  }

  handleRemoveObjects() {
    this.activeObjects.children.forEach((obj) => {
      if (obj.position.z >= 8) {
        this.activeObjects.remove(obj);
        scoreManager.score--
      }
    });
  }
}

export const unitsManager = new UnitsManager();
