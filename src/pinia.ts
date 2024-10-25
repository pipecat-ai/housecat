import { LGraph } from '@comfyorg/litegraph';
import { defineStore } from 'pinia';
import { exportWorkflowType, loadWorkflowType } from './types';

export const useMainStore = defineStore('mainStore', {
  state: (): {
    graph: LGraph | null;
    exportWorkflow?: exportWorkflowType;
    loadWorkflow?: loadWorkflowType;
  } => ({ graph: null }),
});