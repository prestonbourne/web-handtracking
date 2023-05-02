import Stats from "stats.js";

class UIManager {
  constructor() {
    this.$canvas = document.getElementById("game_canvas");
    this.$scoreCountCounter = document.getElementById("score_container");
    this.$scoreCount = document.getElementById("score_count");
    this.$debugMode = document.getElementById("debugMode");
  }

  bindToggleDebugMode(handler) {
    this.$debugMode.addEventListener("click", (e) => {
      handler(e);
    });
  }

  /**
   * @param {number} count
   */
  set score(count) {
    const countStr = count.toString();
    this.$scoreCount.innerText = countStr;
  }

  init() {
    this.$scoreCountCounter.style.display = "flex";

    
  }

  handleToggleDebugMode(debugMode) {
   
    if (debugMode === true) {
      this.stats = new Stats();
      this.stats.showPanel(0);
      document.body.appendChild(this.stats.dom);
    } else {
      document.body.removeChild(this.stats.dom);
      this.stats = null;
    }
  }

  statsBegin() {
    this.stats.begin();
  }

  statsEnd() {
   return this.stats.end();
  }
}

export const uiManager = new UIManager();
