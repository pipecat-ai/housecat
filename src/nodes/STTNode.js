import { LiteGraph } from '@comfyorg/litegraph';
import { languageOptions, colors } from '../configs';

class STTNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "Speech-to-Text";
        this.addInput("audio", "audio");
        this.addOutput("text", "string");
        
        this.properties = {
            service: "deepgram",
            language: "en",
            audio_passthrough: false
        };
        
        this.addWidget("combo", "Service", this.properties.service, (v) => { 
            this.properties.service = v;
            this.onServiceChange(v);
        }, { values: ["deepgram", "whisper", "azure"] });
        
        this.addWidget("combo", "Language", this.properties.language, (v) => { this.properties.language = v; }, { values: languageOptions });
        this.addWidget("toggle", "Audio Passthrough", this.properties.audio_passthrough, (v) => { this.properties.audio_passthrough = v; });
        
        this.color = colors.yellow;
        
        this.onServiceChange(this.properties.service);
    }

    onServiceChange(value) {
        // Store the first 3 widgets (common widgets)
        const commonWidgets = this.widgets.slice(0, 3);
        
        // Clear all widgets
        this.widgets = [];
        
        // Re-add the common widgets
        this.widgets.push(...commonWidgets);

        this.setDirtyCanvas(true, true);
    }

    onExecute() {
        const audioInput = this.getInputData(0);
        if (audioInput) {
            const simulatedText = `Simulated transcription of audio input using ${this.properties.service} (${this.properties.language})`;
            this.setOutputData(0, simulatedText);
            
            if (this.properties.audio_passthrough) {
                // If audio passthrough is enabled, we would also output the audio
                // This would be handled by the actual service
            }
        }
    }
}

export { STTNode };
