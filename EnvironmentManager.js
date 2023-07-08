import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { Assets, Colors } from "./utils/constants";
import { FBXLoader } from "three/addons/loaders/FBXLoader";
import { gameManager } from "./GameManager";

const ColorLerps = {
  ToCyan: "LerpToCyan",
  ToPink: "LerpToPink",
  ToBlack: "LerpToBlack",
};

class EnvironmentManager {
  constructor() {
    this._GLTFLoader = new GLTFLoader();
    this._FBXLoader = new FBXLoader();

    this._lerpCounter = 0;

    this.currLerp = ColorLerps.ToCyan;

    this._FBXLoader.load(Assets.Environment, (obj) => {
      /**
       * @type { THREE.Mesh }
       */
      
      this.envMesh = obj.children[0];
      this.envMesh.rotation.z = Math.PI / 2;
      this.envMesh.position.y = -120;
      //Grid Color
      /**
       * @type {THREE.Material}
       */
    const mainMat = this.envMesh.material[1];
    mainMat.color = Colors.Pink;
     mainMat.emissive = new THREE.Color(.1,.1,.1)
     
      
      mainMat.emissiveIntensity = 0.3;
    
      this.envMesh.material[0].emissiveIntensity = 0;
    });

    this._GLTFLoader.load(Assets.GameTitleGLB, (gltf) => {
      /**
       * @type { THREE.Mesh }
       */
      this.titleMesh = gltf.scene.children[0];
      this.titleMesh.scale.set(3, 3, 3);
      const box = new THREE.Box3().setFromObject(this.titleMesh);
      const vector = new THREE.Vector3();
      box.getCenter(vector);
      vector.setY(-3);
      vector.setZ(8);
      this.titleMesh.position.sub(vector);

      this.titleMesh.material = new THREE.MeshStandardMaterial({
        color: 0xfbcb00,
      });
      this.titleMesh.material.emissive = new THREE.Color(0xff7800);
      this.titleMesh.material.emissiveIntensity = 3;
    });

    this._lights = {
      ambient: new THREE.AmbientLight(0xffffff, 0.4),
      point: new THREE.PointLight(),
    };

    this._lights.point.position.set(2, 3, 4);
  }

  get lights() {
    return Object.values(this._lights);
  }

  _handleLerpCount() {
    setInterval(() => {
      if (this._lerpCounter >= 1) {
        this._lerpCounter = 0;
      }
      this._lerpCounter += 0.014;
    }, 100);
  }

  loop(deltaTime) {
    this._handleTerrain(deltaTime);
    environment._handleLerpCount();
    this.handleTerrainVFX();
  }

  _handleTerrain(deltaTime) {
    const ENVMESH_RESET_POINT_Z = 3000;

    if (!!this.envMesh) {
      this.envMesh.position.z += 100 * deltaTime;

      if (this.envMesh.position.z >= ENVMESH_RESET_POINT_Z) {
        this.envMesh.position.z = 0;
      }
    }
  }

  get terrainLight() {
    return this.envMesh.material[1];
  }

  handleTerrainVFX() {
  
    switch (this.currLerp) {
      case ColorLerps.ToCyan:
        if (this._lerpCounter > 1) {
          this._lerpCounter = 0;
          this.currLerp = ColorLerps.ToPink;
          return;
        }
      
        this.terrainLight.color.lerp(Colors.Cyan, this._lerpCounter);

        break;

      case ColorLerps.ToPink:
        if (this._lerpCounter > 1) {
          this._lerpCounter = 0;
          this.currLerp = ColorLerps.ToBlack;
          return;
        }
       
        
        this.terrainLight.color.lerp(Colors.Pink, this._lerpCounter);
        break;
      case ColorLerps.ToBlack:
        if (this._lerpCounter > 1) {
          this._lerpCounter = 0;
          this.currLerp = ColorLerps.ToCyan;
          return;
        }
       
        
        this.terrainLight.color.lerp(Colors.Black, this._lerpCounter);
        break;
    }
  }
}

export const environment = new EnvironmentManager();
