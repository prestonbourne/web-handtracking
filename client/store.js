/**
 * @typedef Landmark
 * @type {object}
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */

/**
 * @typedef FollowPoint
 * @type {("wrist" | "palm")}
 */

class Store {
  /**
   * @param {FollowPoint} _followPoint
   * @param {number} multiplier
   */

  #multiplier = 3;
  constructor(_followPoint, multiplier) {
    this.map = new Map();
    /**
     * @type {Landmark[] | []}
     * @public
     */
    this.landmarks = [];
    this._followPoint = _followPoint;
    this._mainPoint;
    this.#multiplier = multiplier;
    /**
     * @type {Landmark[] | []}
     * @public
     */
    this.handCoords = [];
  }

  /**
   * @param {number} [idx]
   * @param {boolean} [three = false]
   * @returns {Landmark[]}
   */
  getLandmarks(idx, three = false) {
    if (typeof idx === "number") {
      if (three) {
        return this.#multiplyLandmarks()[idx];
      }

      return this.map.get("landmarks")[idx];
    }

    if (idx === undefined) {
      if (three) {
        this.handCoords = this.#multiplyLandmarks();
        return this.#multiplyLandmarks();
      }

      return this.map.get("landmarks");
    }
  }

  /**
   * @param {Landmark[]} landmarks
   */
  setLandmarks(landmarks) {
    this.landmarks = landmarks;
    this.#multiplyLandmarks();
    this.map.set("landmarks");
    this._setMainPoint(this._followPoint);
  }


  get mainPoint() {
    return this._mainPoint;
  }
  /**
   * @param {FollowPoint} point
   */
  setFollowPoint(point) {
    this._followPoint = point;
  }

  #multiplyLandmarks() {
    /**
     * @type {Landmark[] | []}
     */
    const output = [];
    for (const lndmrk of this.landmarks) {
      let { x, y, z } = lndmrk;


      output.push({
        x: x * -this.#multiplier,
        y: y * -this.#multiplier,
        z: z * this.#multiplier,
      });
    }
    this.handCoords = output;

    return output;
  }
}

const handData = new Store("palm", 8);

export default handData;
