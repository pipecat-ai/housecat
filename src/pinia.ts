import { defineStore } from 'pinia';

export const useMainStore = defineStore('mainStore', {
  state: () => ({graph: null}), // You can add more state if needed
  // ({ count: counter.count + 1 })
  actions: {
    exportJSON() {
      console.log('pinia actions exportJSON <> function called');
      console.log("_____pinia.ts this", this)
      // console.log("_____pinia.ts this.$patch()", this.$patch())
      // console.log("_____pinia.ts this.state()", this.state())
    },
    // updateGraph() {
    //   return state().graph
    // }
  },
});