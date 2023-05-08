import nx from '../assets/skybox/nx.png'
import ny from '../assets/skybox/ny.png'
import nz from '../assets/skybox/nz.png'
import px from '../assets/skybox/px.png'
import py from '../assets/skybox/py.png'
import pz from '../assets/skybox/pz.png'


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
 SkyboxCubeMap: [px, nx, py, ny, pz, nz]
}

