import { LiteGraph } from '@comfyorg/litegraph';
import { colors } from '../configs';

class AudioOutputNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "Audio Output";
        this.addInput("audio", "audio");
        
        this.properties = {
            output_source: "daily",
            audio_out_enabled: true,
            audio_out_is_live: true,
            audio_out_bitrate: 96000
        };
        
        this.addWidget("combo", "Output Source", this.properties.output_source, (v) => { 
            this.properties.output_source = v;
            this.onOutputSourceChange(v);
        }, { values: ["local", "livekit", "daily"] });

        // Common settings
        this.addWidget("toggle", "Audio Out Enabled", this.properties.audio_out_enabled, (v) => { this.properties.audio_out_enabled = v; });
        this.addWidget("toggle", "Is Live", this.properties.audio_out_is_live, (v) => { this.properties.audio_out_is_live = v; });
        this.addWidget("number", "Bitrate", this.properties.audio_out_bitrate, (v) => { this.properties.audio_out_bitrate = v; }, { min: 8000, max: 320000, step: 1000 });
        
        this.color = colors.green;
        
        this.onOutputSourceChange(this.properties.output_source);
    }

    onOutputSourceChange(value) {
        // Store the first 4 widgets (common widgets)
        const commonWidgets = this.widgets.slice(0, 4);
        
        // Clear all widgets
        this.widgets = [];
        
        // Re-add the common widgets
        this.widgets.push(...commonWidgets);

        this.setDirtyCanvas(true, true);
    }

    onExecute() {
        const audioInput = this.getInputData(0);
        if (audioInput) {
            console.log("Processing audio output:", audioInput, "to source:", this.properties.output_source);
        }
    }
}

export { AudioOutputNode };
