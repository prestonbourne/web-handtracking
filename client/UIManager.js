import Stats from "stats.js";
import handLandmarker from "./landmarker";
import { landmarkStore } from "./LandmarkStore";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";

class UIManager {
  constructor() {
    this.$canvas = document.getElementById("game_canvas");
    this.$scoreContainer = document.getElementById("score_container");
    this.$scoreCount = document.getElementById("score_count");
    this.$debugMode = document.getElementById("debugMode");
   
    this.$startGameButton = document.getElementById("start_game_button");
    this.$video = document.getElementById("webcam");
    this.$videoOutputContainer = document.getElementById("output_container");
    this.$videoCanvas = document.getElementById("output_canvas");

    this.$infoBox = document.getElementById("info-box");
    this.$infoBoxButton = this.$infoBox.children[0];

    this.webcamRunning = false;

    //configs
    document.getElementById("debug_toggle_container").style.display = "none";
  }

  bindEnableCam(handler) {
    this.$startGameButton.addEventListener("click", async (e) => {
      const hasGetUserMedia = !!(
        navigator.mediaDevices && navigator.mediaDevices.getUserMedia
      );

      const constraints = {
        video: true,
      };

      if (hasGetUserMedia) {
        if (!!handLandmarker === false) {
          console.warn("wait, hand detection model not ready");
        }

        if (this.webcamRunning === true) {
          this.webcamRunning = false;
        } else {
          this.webcamRunning = true;
        }

        const handleStream = (stream) => {
          this.$video.srcObject = stream;
          this.$video.addEventListener(
            "loadeddata",
            this.predictWebcam.bind(this)
          );
        };

        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => handleStream(stream))
          .catch((e) => {
            console.error(e.message);
          });

        handler();
      }
    });
  }

  async predictWebcam() {
    // Now let's start detecting the stream.

    const nowInMs = Date.now();
    const results = handLandmarker.detectForVideo(this.$video, nowInMs);

    const ctx = this.$videoCanvas.getContext("2d");
    ctx.save();
    ctx.clearRect(0, 0, this.$videoCanvas.width, this.$videoCanvas.height);

    if (results.landmarks) {
      for (const landmarks of results.landmarks) {
        landmarkStore.landmarks = landmarks;

        //TODO: Find out why these dont work in PROD
        const drawingUtils = !!(drawConnectors && drawLandmarks)
        
        if(drawingUtils){
          drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 2,
          });
          drawLandmarks(ctx, landmarks, { color: "#FF0000", lineWidth: 2 });
        }

      }
    }
    ctx.restore();

    // Call this function again to keep predicting when the browser is ready.
    if (this.webcamRunning === true) {
      window.requestAnimationFrame(this.predictWebcam.bind(this));
    }
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
    this.$scoreContainer.style.display = "flex";
    this.$videoOutputContainer.style.display = "none";

    this.$startGameButton.remove();
    this.$startGameButton = null;

    document.getElementById("debug_toggle_container").style.display = "block";

    this._bindAccordion();
  }

  handleToggleDebugMode(debugMode) {
    if (debugMode === true) {
      this.stats = new Stats();
      this.stats.showPanel(0);
      document.body.appendChild(this.stats.dom);
      this.$videoOutputContainer.style.display = "block";
    } else {
      this.$videoOutputContainer.style.display = "none";
      document.body.removeChild(this.stats.dom);
      this.stats = null;
    }
  }

  _bindAccordion() {
    document
      .getElementById("info-box")
      .children[0].addEventListener("click", (e) => {
        e.target.classList.toggle('open')
        const panel = e.target.nextElementSibling;

        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }

        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
  }

  statsBegin() {
    this.stats.begin();
  }

  statsEnd() {
    return this.stats.end();
  }
}

export const ui = new UIManager();
