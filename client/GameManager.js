import * as THREE from "three";
import { uiManager } from "./UIManager";
import { unitsManager } from "./UnitsManager";
import { scoreManager } from "./ScoreManager";
import { landmarkStore } from "./LandmarkStore";
import { Assets, Events } from "./utils/constants";
import { handManager } from "./HandManager";
import { soundManager } from "./SoundManager";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import socket from "./socket";



export class GameManager {
  constructor() {
    this.debugMode = false;
    this.isPlaying = false;
    
    const texture = new THREE.CubeTextureLoader().load(Assets.SkyboxCubeMap);
   
    this.scene = new THREE.Scene();
    this.scene.background = texture;
    this.camera = new THREE.PerspectiveCamera(
      120,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );

    this.debugCam = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: uiManager.$canvas,
    });

    this.axesHelper = new THREE.AxesHelper(5);

    this.currTime = Date.now();

    this.clock = new THREE.Clock();
    

 
  }

  get deltaTime() {
    return this.clock.getDelta();
  }




  handleCollision(e) {
    scoreManager.increment();
    uiManager.score = scoreManager.score;

    unitsManager.activeObjects.remove(e.detail);

    //TODO: Animation when object is destroyed???

    soundManager.playCollisionSound();
  }
  _handleToggleDebugMode(e) {
    this.debugMode = e.target.checked;

    uiManager.handleToggleDebugMode(this.debugMode);
    if(this.debugMode){
      
      this.scene.add(this.axesHelper);
    }else{
      this.scene.remove(this.axesHelper)
    }
   
  }

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.debugCam.position.set(0, 0 , 8);
    this.debugCam.lookAt(0, 0, 0);
    this.scene.add(this.debugCam);

    this.camera.position.z = 3;
    this.scene.add(this.camera);

  // const controls = new OrbitControls(this.debugCam, this.renderer.domElement);

    window.addEventListener(
      Events.HandCollision,
      this.handleCollision.bind(this)
    );

    function handleResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight - 24);
  
  
  
      this.debugCam.aspect = window.innerWidth / window.innerHeight;
      this.debugCam.updateProjectionMatrix();
    }

    window.addEventListener("resize", handleResize.bind(this), false);
    uiManager.bindToggleDebugMode(this._handleToggleDebugMode.bind(this));
  
    //TODO: REMOVE BEFORE FINAL VERISON
  

  
    this.scene.add(handManager.handMesh);
    this.scene.add(handManager.arrowGroup);
    this.scene.add(unitsManager.activeObjects);
    uiManager.bindEnableCam(this._start.bind(this))  
  }

  _start() {
  
    uiManager.init()
    unitsManager.start();
    this.renderer.autoClearDepth = false;
    this.isPlaying = true;
    this._play()
  }

  _play() {
  
    this.debugMode && uiManager.statsBegin();
    this.renderer.render(this.scene, this.debugCam);
    socket.send(handManager.indexFingertip)
    unitsManager.handleAnimateObjects(this.deltaTime);
    unitsManager.handleRemoveObjects();
    handManager.landmarks = landmarkStore.landmarks;


    handManager.render(this.camera, this.debugMode);

    

    this.debugMode && uiManager.statsEnd();
    window.requestAnimationFrame(this._play.bind(this));
  }
}

export const gameManger = new GameManager()