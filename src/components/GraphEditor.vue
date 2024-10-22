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
import { useMainStore } from '../pinia';
import '../nodes/nodes.js';  // Import the custom nodes
import workflowData from '../workflow.json';  // Import the workflow JSON

export default defineComponent({
  name: 'GraphEditor',
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const graph = new LGraph();
    const graphCanvas = ref<LGraphCanvas | null>(null);
    const selectedNode = ref<LGraphNode | null>(null);
    const store = useMainStore(); // Access the store

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
        store.graph = graph;
      };

      window.addEventListener('resize', updateCanvasSize);

      if (canvas.value) {
        const canvasElement = canvas.value;
        canvasElement.width = canvasElement.clientWidth;
        canvasElement.height = canvasElement.clientHeight;

        graphCanvas.value = new LGraphCanvas(canvasElement, graph);
        graphCanvas.value.bindEvents();

        graph.start();
        store.graph = graph;

        // Listen to node selection
        graphCanvas.value.onNodeSelected = (node) => {
          selectedNode.value = node;
        };

        ////////////////// test JSON
        // Load workflow from JSON
        loadWorkflow(workflowData);

        // export the graph _to_ JSON
        const outputJson = exportWorkflow(graph);

        // Load workflow again, but from generated JSON
        loadWorkflow(outputJson);
        ////////////////// should be no difference between the two
      }
      console.log("_____store.graph ", store.graph)

      // Initial canvas size update
      updateCanvasSize();

      onUnmounted(() => {
        window.removeEventListener('resize', updateCanvasSize);
        graph.stop();
      });
    });

    const loadWorkflow = (data: any) => {
      console.log("_____GraphEditor.vue loadWorkflow")
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

    const exportWorkflow = (graph) => {
      console.log("_____GraphEditor.vue exportWorkflow")
      let linksArr = []
      let theseNodes = []
      for (let nn in graph.nodes) {
        let n = graph.nodes[nn];
        let tmp = {};
        let asdf = JSON.stringify(n.properties);
        tmp.id = n.id;
        tmp.inputs = n.inputs;
        tmp.pos = n.pos;
        tmp.properties = n.properties;
        tmp.type = n.type;

        // const [, originNodeId, originSlot, targetNodeId, targetSlot] = linkData;
        if (graph.links[nn]) {
          linksArr.push([n.id,
              graph.links[nn].origin_id,
              graph.links[nn].origin_slot,
              graph.links[nn].target_id,
              graph.links[nn].target_slot,
              graph.links[nn].type,
            ])
          }

        theseNodes.push(tmp);
      }

      let outputJson = {
        "nodes": [],
        "links": [],
        "groups": [],
        "config": {},
        "version": 0.4
      }
      outputJson.nodes = theseNodes;
      outputJson.links = linksArr;

      console.log("_____GraphEditor.vue exportWorkflow outputJson:", outputJson)
      return outputJson;
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

    store.exportWorkflow = exportWorkflow;

    // Expose methods to parent components or external scripts
    return {
      canvas,
      loadWorkflow,
      addNode,
      removeNode,
      selectedNode,
      exportWorkflow
    };
  },
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
