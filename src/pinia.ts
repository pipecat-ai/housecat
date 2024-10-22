import { defineStore } from 'pinia';

export const useMainStore = defineStore('mainStore', {
  state: () => ({graph: null}),
});