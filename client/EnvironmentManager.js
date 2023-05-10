import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { Assets } from "./utils/constants";
import {FBXLoader} from "three/addons/loaders/FBXLoader"



class EnvironmentManager {
  constructor() {
   
    this._GLTFLoader = new GLTFLoader();
    this._FBXLoader = new FBXLoader();
    


    this._FBXLoader.load(Assets.Environment, (obj) => {
     /**
      * @type { THREE.Mesh }
      */
      this.envMesh = obj.children[0];
      this.envMesh.rotation.z = Math.PI / 2;
      this.envMesh.position.y = -20;
      //Grid Color
      const mainMat = this.envMesh.material[1]
     mainMat.color = new THREE.Color(0xF97FEF);
     mainMat.emissive =  new THREE.Color('blue');
     mainMat.emissiveIntensity = 20;
    
    this.envMesh.material[0].emissiveIntensity = 0 
    
    })

   


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

     
     
      this.titleMesh.material = new THREE.MeshStandardMaterial({color: 0xFBCB00});
      this.titleMesh.material.emissive = new THREE.Color(0xFF7800);
      this.titleMesh.material.emissiveIntensity = 3
     

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

  loop(deltaTime){
    this._handleTerrain(deltaTime)
  }

  _handleTerrain(deltaTime){
    const ENVMESH_RESET_POINT_Z = 3000;
    

    if(!!this.envMesh){
      this.envMesh.position.z += 100 * deltaTime
     

      if(this.envMesh.position.z > ENVMESH_RESET_POINT_Z){
      
        this.envMesh.position.z = 0
      }

    }
  }
  
}

export const environment = new EnvironmentManager();
