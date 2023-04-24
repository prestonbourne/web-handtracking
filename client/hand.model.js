import { UPDATE_LANDMARKS_EVENT } from "./utils/constants";

/**
 * @typedef Landmark
 * @type {object}
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */


class HandModel {

  constructor() {
    this.landmarks = [];
  }



  /**
   * @param {Landmark[]} landmarks
   */
  setLandmarks(landmarks) {
    this.landmarks = landmarks;
    window.dispatchEvent(new Event(UPDATE_LANDMARKS_EVENT));
  }

}

const model = new HandModel();

export default model;
