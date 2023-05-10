import nx from '../assets/skybox/nx.png'
import ny from '../assets/skybox/ny.png'
import nz from '../assets/skybox/nz.png'
import px from '../assets/skybox/px.png'
import py from '../assets/skybox/py.png'
import pz from '../assets/skybox/pz.png'
import soundwave from "../assets/models/GameTitle1.glb"
import environment from "../assets/models/env/FinalSkyBox.fbx"
import backgroundMusic from '../assets/background.mp3'


export const Events = {
 LandmarksUpdate: "landmarks_update",
 HandCollision: "hand_collide"
}


export const Sound = {
 SequenceOrder: {
  Ascending: 0,
  Descending: 1,
 }
}

export const Assets = {
 SkyboxCubeMap: [px, nx, py, ny, pz, nz],
 GameTitleGLB: soundwave,
 Environment: environment,
 BackgroundMusic: backgroundMusic
}

