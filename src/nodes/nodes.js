import { LiteGraph } from '@comfyorg/litegraph';

// Set up global LiteGraph settings
LiteGraph.CANVAS_GRID_SIZE = 10000;
LiteGraph.WIDGET_BGCOLOR = "#444444";
LiteGraph.NODE_DEFAULT_COLOR = "#939"; // pink - title of node
LiteGraph.NODE_DEFAULT_BGCOLOR = "#353535";
LiteGraph.NODE_DEFAULT_BOXCOLOR = "#666666";
LiteGraph.NODE_DEFAULT_SHAPE = "box";
LiteGraph.NODE_TEXT_COLOR = "#ffffff";
LiteGraph.NODE_SELECTED_COLOR = "#ffffff";
LiteGraph.NODE_SELECTED_BGCOLOR = "#555555";


const FRAME_PROCESSORS = 'frame_processors';

// Helper function to generate random color
function getRandomColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

// 1. Transport Input Node (Audio)
class TransportInputAudioNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "Transport Input (Audio)";
        this.addOutput("audio", "audio");
        this.color = getRandomColor();
    }

    onExecute() {
        // Implement audio input logic here
        this.setOutputData(0, { type: "audio", data: "audio_data" });
    }
}
LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/transport_input_audio`, TransportInputAudioNode);

// 2. Transcription Node (STT)
class TranscriptionNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "Transcription (STT)";
        this.addInput("audio", "audio");
        this.addOutput("text", "string");
        this.color = getRandomColor();
    }

    onExecute() {
        const audio = this.getInputData(0);
        // Implement STT logic here
        this.setOutputData(0, "Transcribed text");
    }
}
LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/transcription`, TranscriptionNode);

// 3. Context Aggregator
class ContextAggregatorNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "Context Aggregator";
        this.addInput("text", "string");
        this.addOutput("context", "object");
        this.color = getRandomColor();
    }

    onExecute() {
        const text = this.getInputData(0);
        // Implement context aggregation logic here
        this.setOutputData(0, { context: "Aggregated context" });
    }
}
LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/context_aggregator`, ContextAggregatorNode);

// 4. LLM Node
class LLMNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "LLM";
        this.addInput("context", "object");
        this.addOutput("response", "string");
        this.color = getRandomColor();
    }

    onExecute() {
        const context = this.getInputData(0);
        // Implement LLM logic here
        this.setOutputData(0, "LLM response");
    }
}
LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/llm`, LLMNode);

// 5. Text to Speech Node
class TextToSpeechNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "Text to Speech";
        this.addInput("text", "string");
        this.addOutput("audio", "audio");
        this.color = getRandomColor();
    }

    onExecute() {
        const text = this.getInputData(0);
        // Implement TTS logic here
        this.setOutputData(0, { type: "audio", data: "synthesized_audio_data" });
    }
}
LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/text_to_speech`, TextToSpeechNode);

// 6. Transport Output Node (Audio)
class TransportOutputAudioNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "Transport Output (Audio)";
        this.addInput("audio", "audio");
        this.color = getRandomColor();
    }

    onExecute() {
        const audio = this.getInputData(0);
        // Implement audio output logic here
        console.log("Audio output:", audio);
    }
}
LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/transport_output_audio`, TransportOutputAudioNode);

// Original Add Node (for reference)
class AddNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = 'Add';
        this.addInput('A', 'number');
        this.addInput('B', 'number');
        this.addOutput('Sum', 'number');
        this.color = getRandomColor();
    }

    onExecute() {
        const A = this.getInputData(0) || 0;
        const B = this.getInputData(1) || 0;
        this.setOutputData(0, A + B);
    }
}
LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/add`, AddNode);
