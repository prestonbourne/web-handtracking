import * as THREE from "three";
import { ui } from "./UIManager";
import { unitsManager } from "./UnitsManager";
import { scoreManager } from "./ScoreManager";
import { landmarkStore } from "./LandmarkStore";
import { Assets, Events } from "./utils/constants";
import { handManager } from "./HandManager";
import { soundManager } from "./SoundManager";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import socket from "./socket";
import { environment } from "./EnvironmentManager";



export class GameManager {
  constructor() {
    this.debugMode = false;
    this.isPlaying = false;

    
    







    this.scene = new THREE.Scene();

    this.utilCam = new THREE.PerspectiveCamera(
      120,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );

    this.playerCam = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: ui.$canvas,
    });

    this.axesHelper = new THREE.AxesHelper(5);

    this.currTime = Date.now();

    this.clock = new THREE.Clock();
    
 
 
 
  }






  handleCollision(e) {
    scoreManager.increment();
    ui.score = scoreManager.score;
    socket.send(1)
    unitsManager.activeObjects.remove(e.detail);

    //TODO: Animation when object is destroyed???

    soundManager.playCollisionSound();
  }
  _handleToggleDebugMode(e) {
    this.debugMode = e.target.checked;

    ui.handleToggleDebugMode(this.debugMode);
    if(this.debugMode){
      
      this.scene.add(this.axesHelper);
    }else{
      this.scene.remove(this.axesHelper)
    }
   
  }

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.autoClear = false;
   // this.renderer.autoClearDepth = false;
    this.renderer.setClearColor(0xffffff, 0)

    this.effects = {
      composer: new EffectComposer(this.renderer),
      renderer: new RenderPass(this.scene, this.playerCam),
      bloomPass: new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.3,
      1.1,
      0.5
      )
    }

    this.effects.composer.renderToScreen = true;
    this.effects.composer.addPass(this.effects.renderer);
    this.effects.composer.addPass(this.effects.bloomPass);
    
    this.playerCam.position.set(0, 0 , 10);
    this.playerCam.lookAt(0, 0, 0);
    this.scene.add(this.playerCam);
    this.scene.add(...environment.lights);
    this.scene.add(environment.titleMesh, environment.envMesh);
    
    this.utilCam.position.z = 3;
    this.scene.add(this.utilCam);

   const controls = new OrbitControls(this.playerCam, this.renderer.domElement);

    window.addEventListener(
      Events.HandCollision,
      this.handleCollision.bind(this)
    );

    function handleResize() {
      this.playerCam.aspect = window.innerWidth / window.innerHeight;
      this.playerCam.updateProjectionMatrix();

   
      this.renderer.setSize(window.innerWidth, window.innerHeight);
  
      
  
      this.utilCam.aspect = window.innerWidth / window.innerHeight;
      this.utilCam.updateProjectionMatrix();
    }

    window.addEventListener("resize", handleResize.bind(this), false);
    ui.bindToggleDebugMode(this._handleToggleDebugMode.bind(this));
  
    //TODO: REMOVE BEFORE FINAL VERISON
  

  
    this.scene.add(handManager.handMesh);
    this.scene.add(handManager.arrowGroup);
    this.scene.add(unitsManager.activeObjects);
    ui.bindEnableCam(this._start.bind(this))  ;
   
  }

  _start() {
    soundManager.start();
    ui.init()
    unitsManager.start();
    
    this.isPlaying = true;
    this._play()
  }

  _play() {
    this.deltaTime = this.clock.getDelta();
  
    window.requestAnimationFrame(this._play.bind(this));
    
    this.debugMode && ui.statsBegin();
   
   
    unitsManager.handleAnimateObjects(this.deltaTime);
    unitsManager.handleRemoveObjects();
    handManager.landmarks = landmarkStore.landmarks;


    
    environment.loop(this.deltaTime)

    handManager.render(this.utilCam, this.debugMode);


  this.effects.composer.render()
   // this.renderer.render(this.scene, this.playerCam);
    this.debugMode && ui.statsEnd();
   
  }
}

export const gameManger = new GameManager()