import Stats from "stats.js";



class UIManager {
  constructor() {
    this.$canvas = document.getElementById("game_canvas");
    this.$scoreCountCounter = document.getElementById("score_overlay");
    this.$scoreCount = document.getElementById("score_count");
  }

  /**
   * @param {number} count
   */
  set score(count) {
    const countStr = count.toString();
    this.$scoreCount.innerText = countStr;
  }

  init(debugMode) {
    this.$scoreCountCounter.style.display = "flex";
    if (debugMode !== true) return;

    this.debugMode = true;
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
  }

  statsBegin() {
    if (this.debugMode !== true) return;
    
    this.stats.begin();
  }

  statsEnd() {
    if (this.debugMode !== true) return;
    this.stats.end();
  }
}

export const uiManager = new UIManager();
