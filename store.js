function createStore(){
 const store = new Map();

 store.set("landmarks", {});

 return store;
}

const store = createStore()
export default store;