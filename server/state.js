const LIGHT = {
  OFF: false,
  ON: true,
};

function createStore() {
  class State {
    #store = new Map();

    constructor() {
      this.#store.set("lightStatus", LIGHT.OFF);
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

module.exports = {state, LIGHT};
