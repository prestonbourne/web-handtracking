const {SerialPort} = require("serialport")

const Light = {
  Off: false,
  On: true,
};

function createStore() {
  class State {
    #store = new Map();
    
    constructor() {
     
    }
    get lightStatus() {
      return this.#store.get("lightStatus");
    }

    set lightStatus(newStatus) {
      this.#store.set("lightStatus", newStatus);
      return newStatus;
    }

  }

  return new State();
}

const state = createStore();

module.exports = {state, Light};
