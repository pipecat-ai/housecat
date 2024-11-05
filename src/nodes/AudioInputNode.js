import { LiteGraph } from '@comfyorg/litegraph';
import { colors } from '../configs';

class AudioInputNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "Audio Input";
        this.addOutput("audio", "audio");
        
        this.properties = {
            input_source: "daily",
            audio_in_enabled: true,
            vad_enabled: false,
            vad_audio_passthrough: false
        };
        
        this.addWidget("combo", "Input Source", this.properties.input_source, (v) => { 
            this.properties.input_source = v;
        }, { values: ["local", "livekit", "daily"] });

        // Common settings
        this.addWidget("toggle", "Audio In Enabled", this.properties.audio_in_enabled, (v) => { this.properties.audio_in_enabled = v; });
        this.addWidget("toggle", "VAD Enabled", this.properties.vad_enabled, (v) => { this.properties.vad_enabled = v; });
        this.addWidget("toggle", "VAD Audio Passthrough", this.properties.vad_audio_passthrough, (v) => { this.properties.vad_audio_passthrough = v; });
        
        this.color = colors.indigo;
    }

    onExecute() {
        this.setOutputData(0, { type: "audio", data: "simulated_audio_data", source: this.properties.input_source });
    }
}

export { AudioInputNode };
