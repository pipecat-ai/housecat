<template>
  <div class="graph-editor">
    <div ref="graphContainer" class="graph-container">
      <canvas ref="canvas" tabindex="1"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { LGraph, LGraphCanvas, LiteGraph, LGraphNode } from '@comfyorg/litegraph';

// Register a custom node type
LiteGraph.registerNodeType('demo/add', class AddNode extends LiteGraph.LGraphNode {
  constructor() {
    super();
    this.title = 'Add';
    this.addInput('A', 'number');
    this.addInput('B', 'number');
    this.addOutput('Sum', 'number');
  }

  onExecute() {
    const A = this.getInputData(0) || 0;
    const B = this.getInputData(1) || 0;
    this.setOutputData(0, A + B);
  }
});

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

    const addNode = () => {
      const node = LiteGraph.createNode('demo/add');
      if (node) {
        node.pos = [200, 200];
        graph.add(node);
      }
    };

    const removeSelectedNode = () => {
      if (selectedNode.value) {
        graph.remove(selectedNode.value);
        selectedNode.value = null;
      }
    };

    return {
      canvas,
      addNode,
      removeSelectedNode
    };
  }
});
</script>

<style scoped>
.graph-editor {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.controls {
  padding: 10px;
  display: flex;
  justify-content: center;
}

.graph-container {
  flex: 1;
  display: flex;
}

canvas {
  flex: 1;
  display: block;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
}
</style>