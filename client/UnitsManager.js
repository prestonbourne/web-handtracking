import * as THREE from "three";
import { generateRandFloat, generateRandInt } from "./utils/helpers";

class UnitsManager {
  constructor() {
    this.activeObjects = new THREE.Group();
    this.materials = []
    
    
  }

   _createMaterials(){

   const wireframeRed = new THREE.MeshLambertMaterial({
    color: "red",
  });
  const wireframeGreen = new THREE.MeshLambertMaterial({
    color: "green",
  });

  const wireFrameBlue = new THREE.MeshLambertMaterial({
    color: "blue",
  });

  const materials = [wireframeRed, wireframeGreen, wireFrameBlue];

  this.materials = materials;

  }

  start() {
   this._createMaterials();
    this._handleAddObjects();
  }

  get randomGeometry() {

   
  
    const geometry = new THREE.BoxGeometry(
     generateRandFloat(0.3,0.6),
     generateRandFloat(0.3,0.6),
     1,
    );

    return geometry;
  }

  get randomMaterial() {

   const randomIdx = Math.floor(generateRandInt(0, this.materials.length - 1));

  
   
    const randomMat = this.materials[randomIdx];

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
     
    
    
     
      obj.position.z += 2 * deltaTime;
    
      
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
