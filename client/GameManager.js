import { generateNumberBetween, postData, throttle } from "./utils/helpers";
import * as THREE from "three";
import { uiManager } from "./UIManager";
import { unitsManager } from "./UnitsManager";
import { scoreManager } from "./ScoreManager";
import { landmarkStore } from "./LandmarkStore";
import { EVENTS } from "./utils/constants";
import { handManager } from "./HandManager";
import { soundManager } from "./SoundManager";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const throttledPostData = throttle((data) => postData(data), 300);

class GameManager {
  /**
   * 
   * @param {boolean} debugMode 
   */
  constructor(debugMode) {
    this.debugMode = debugMode
    this.isPlaying = false;

    this.scene = new THREE.Scene();
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

    this.currTime = Date.now();

    this.clock = new THREE.Clock();
  }

  get deltaTime() {
    return this.clock.getDelta();
  }

  handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight - 24);

    //for debug camera
    const insetWidth = window.innerWidth / 2;
    const insetHeight = window.innerHeight / 2;

    this.debugCam.aspect = window.innerWidth / window.innerHeight;
    this.debugCam.updateProjectionMatrix();
  }

  postData = throttledPostData;

  handleCollision(e) {
    scoreManager.increment();
    uiManager.score = scoreManager.score;

    unitsManager.activeObjects.remove(e.detail);

    //TODO: Animation when object is destroyed???

    soundManager.playCollisionSound();
  }

  _init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight - 24);
    this.debugCam.position.set(0, 6, 6);
    this.debugCam.lookAt(0, 0, 0);
    this.scene.add(this.debugCam);

    this.camera.position.z = 3;
    this.scene.add(this.camera);

    const controls = new OrbitControls(this.debugCam, this.renderer.domElement);

    window.addEventListener(
      EVENTS.HAND_COLLIDE,
      this.handleCollision.bind(this)
    );

    window.addEventListener("resize", this.handleResize.bind(this), false);

    //TODO: REMOVE BEFORE FINAL VERISON
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);

    handManager.createCubes();
    this.scene.add(...handManager.cubes);
    this.scene.add(handManager.arrowGroup);
    this.scene.add(unitsManager.activeObjects);
  }

  start() {
    this._init();
    this.isPlaying = true;
    unitsManager.start();
    uiManager.init(this.debugMode);
    gameManger.play()
  }

  play() {
   
    uiManager.statsBegin()

    unitsManager.handleAnimateObjects(this.deltaTime);
    unitsManager._handleRemoveObjects();
    handManager.landmarks = landmarkStore.landmarks;

    // renderer.render(scene, camera);
   
    handManager.render(this.camera, this.scene, true, this.deltaTime);
  

    this.renderer.render(this.scene, this.debugCam);
  

    uiManager.statsEnd()
    window.requestAnimationFrame(this.play.bind(this));
    
  }
}

export const gameManger = new GameManager(true);
