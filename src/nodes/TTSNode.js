import { LiteGraph } from '@comfyorg/litegraph';
import { languageOptions, colors } from '../configs';

class TTSNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "Text-to-Speech";
        this.addInput("text", "string");
        this.addOutput("audio", "audio");
        
        this.properties = {
            service: "cartesia",
            language: "en",
            aggregate_sentences: true,
            push_text_frames: true
        };
        
        this.addWidget("combo", "Service", this.properties.service, (v) => { 
            this.properties.service = v;
            this.onServiceChange(v);
        }, { values: ["cartesia", "deepgram", "eleven_labs"] });
        
        this.addWidget("combo", "Language", this.properties.language, (v) => { this.properties.language = v; }, { values: languageOptions });
        this.addWidget("toggle", "Aggregate Sentences", this.properties.aggregate_sentences, (v) => { this.properties.aggregate_sentences = v; });
        this.addWidget("toggle", "Push Text Frames", this.properties.push_text_frames, (v) => { this.properties.push_text_frames = v; });
        
        this.color = colors.orange;
        
        this.onServiceChange(this.properties.service);
    }

    onServiceChange(value) {
        // Store the first 4 widgets (common widgets)
        const commonWidgets = this.widgets.slice(0, 4);
        
        // Clear all widgets
        this.widgets = [];
        
        // Re-add the common widgets
        this.widgets.push(...commonWidgets);

        this.setDirtyCanvas(true, true);
    }

    onExecute() {
        const textInput = this.getInputData(0);
        if (textInput) {
            const simulatedAudio = { 
                type: "audio", 
                data: `simulated_audio_data_${this.properties.service}_${this.properties.language}` 
            };
            this.setOutputData(0, simulatedAudio);
            
            if (this.properties.push_text_frames) {
                // If push text frames is enabled, we would also output the text
                // This would be handled by the actual service
            }
        }
    }
}

export { TTSNode };
