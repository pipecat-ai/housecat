<template>
  <div class="graph-editor">
    <div ref="graphContainer" class="graph-container">
      <canvas ref="canvas" tabindex="1"></canvas>
    </div>
  </div>
</template>

<script lang="ts">

// affects back canvas
window.devicePixelRatio = 1;

import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { LGraph, LGraphCanvas, LiteGraph, LGraphNode } from '@comfyorg/litegraph';
import '../nodes/nodes.js';  // Import the custom nodes
import workflowData from '../workflow.json';  // Import the workflow JSON

export default defineComponent({
  name: 'GraphEditor',
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const graph = new LGraph();
    const graphCanvas = ref<LGraphCanvas | null>(null);
    const selectedNode = ref<LGraphNode | null>(null);

    onMounted(() => {
      const updateCanvasSize = () => {
        if (canvas.value) {
          const canvasElement = canvas.value;
          canvasElement.width = canvasElement.clientWidth;
          canvasElement.height = canvasElement.clientHeight;
          if (graphCanvas.value) {
            graphCanvas.value.resize();
          }
        }
      };

      window.addEventListener('resize', updateCanvasSize);

      if (canvas.value) {
        const canvasElement = canvas.value;
        canvasElement.width = canvasElement.clientWidth;
        canvasElement.height = canvasElement.clientHeight;

        graphCanvas.value = new LGraphCanvas(canvasElement, graph);
        graphCanvas.value.bindEvents();
        // Load workflow from JSON
        loadWorkflow(workflowData);

        graph.start();

        // Listen to node selection
        graphCanvas.value.onNodeSelected = (node) => {
          selectedNode.value = node;
        };
      }

      // Initial canvas size update
      updateCanvasSize();

      onUnmounted(() => {
        window.removeEventListener('resize', updateCanvasSize);
        graph.stop();
      });
    });

    const loadWorkflow = (data: any) => {
      graph.clear();
      
      // Create nodes
      const nodeMap = new Map();
      data.nodes.forEach((nodeData: any) => {
        const node = LiteGraph.createNode(nodeData.type);
        if (node) {
          node.configure(nodeData);
          graph.add(node);
          nodeMap.set(nodeData.id, node);
        } else {
          console.error(`Failed to create node of type: ${nodeData.type}`);
        }
      });

      // Create links
      data.links.forEach((linkData: any) => {
        const [, originNodeId, originSlot, targetNodeId, targetSlot] = linkData;
        const originNode = nodeMap.get(originNodeId);
        const targetNode = nodeMap.get(targetNodeId);
        
        if (originNode && targetNode) {
          originNode.connect(originSlot, targetNode, targetSlot);
        } else {
          console.error(`Failed to create link: ${linkData}`);
        }
      });

      graph.setDirtyCanvas(true, true);
    };

    const addNode = (type: string, config: any = {}) => {
      const node = LiteGraph.createNode(type);
      if (node) {
        node.configure(config);
        graph.add(node);
      }
    };

    const removeNode = (nodeId: number) => {
      const node = graph.getNodeById(nodeId);
      if (node) {
        graph.remove(node);
      }
    };

    // Expose methods to parent components or external scripts
    return {
      canvas,
      loadWorkflow,
      addNode,
      removeNode,
      selectedNode
    };
  }
});
</script>

<style scoped>
.graph-editor {
  width: 100%;
  height: 100%;
}

.graph-container {
  width: 100%;
  height: 100%;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
