import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { Assets } from './utils/constants';



class EnvironmentManager{
 constructor(){
  this._GLTFLoader = new GLTFLoader();

  this._GLTFLoader.load(Assets.GameTitleGLB, (gltf) => {
   this.titleMesh = gltf.scene.children[0];
   this.titleMesh.scale.set(3,3,3)
   const box = new THREE.Box3().setFromObject( this.titleMesh );
   const vector = new THREE.Vector3();
   box.getCenter(vector);
   vector.setY(-3);
   vector.setZ(8);
   this.titleMesh.position.sub( vector );
 
   
  })


  
  this._lights = {
   ambient: new THREE.AmbientLight(0xffffff, 0.6),
   point: new THREE.PointLight()
 }

 this._lights.point.position.set(2,3,4);
  
 }

 get lights(){
  return Object.values(this._lights)
 }

}

export const environment = new EnvironmentManager()

