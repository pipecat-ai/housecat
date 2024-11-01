import { LiteGraph } from '@comfyorg/litegraph';

const PROCESSORS = 'processors';
const INPUTS = 'inputs';
const OUTPUTS = 'outputs';

// Helper function to generate random color
function getRandomColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

// LLM Node
class LLMNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "LLM";
        this.addInput("context", "object");
        this.addInput("system_prompt", "string");
        this.addInput("user_prompt", "string");
        this.addOutput("response", "string");
        
        this.properties = {
            model: "gpt-4",
            temperature: 0.7,
            max_tokens: 150,
            frequency_penalty: 0,
            presence_penalty: 0,
            top_p: 1,
        };
        
        this.addWidget("combo", "Model", this.properties.model, (v) => { this.properties.model = v; }, { values: ["gpt-3.5-turbo", "gpt-4", "gpt-4-turbo"] });
        this.addWidget("number", "Temperature", this.properties.temperature, (v) => { this.properties.temperature = v; }, { min: 0, max: 1, step: 0.1 });
        this.addWidget("number", "Max Tokens", this.properties.max_tokens, (v) => { this.properties.max_tokens = v; }, { min: 1, max: 4096, step: 1 });
        this.addWidget("number", "Frequency Penalty", this.properties.frequency_penalty, (v) => { this.properties.frequency_penalty = v; }, { min: -2, max: 2, step: 0.1 });
        this.addWidget("number", "Presence Penalty", this.properties.presence_penalty, (v) => { this.properties.presence_penalty = v; }, { min: -2, max: 2, step: 0.1 });
        this.addWidget("number", "Top P", this.properties.top_p, (v) => { this.properties.top_p = v; }, { min: 0, max: 1, step: 0.1 });
        
        this.color = "rgb(250, 5, 10)";
    }

    onExecute() {
        const contextInput = this.getInputData(0);
        const systemPrompt = this.getInputData(1);
        const userPrompt = this.getInputData(2);
        if (contextInput && systemPrompt && userPrompt) {
            // In a real implementation, this would make an API call to the LLM service
            // For now, we'll just simulate the output
            const simulatedResponse = `Simulated LLM response using model ${this.properties.model}. System prompt: "${systemPrompt.substring(0, 30)}...". User prompt: "${userPrompt.substring(0, 30)}..."`;
            this.setOutputData(0, simulatedResponse);
        }
    }
}

LiteGraph.registerNodeType(`${PROCESSORS}/llm`, LLMNode);

// Text to Speech Node
class TextToSpeechNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "Text to Speech";
        this.addInput("text", "string");
        this.addOutput("audio", "audio");
        this.color = "rgb(100,100,10)"
    }

    onExecute() {
        const text = this.getInputData(0);
        // Implement TTS logic here
        this.setOutputData(0, { type: "audio", data: "synthesized_audio_data" });
    }
}
LiteGraph.registerNodeType(`${PROCESSORS}/text_to_speech`, TextToSpeechNode);

// Audio Input Node
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
        
        this.color = "#4B0082";  // Indigo
    }

    onExecute() {
        this.setOutputData(0, { type: "audio", data: "simulated_audio_data", source: this.properties.input_source });
    }
}

LiteGraph.registerNodeType(`${INPUTS}/audio_input`, AudioInputNode);

// Text Input Node
class TextInputNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "Text Input";
        this.addOutput("text", "string");
        
        this.properties = {
            text: ""
        };
        
        this.addWidget("text", "Text", this.properties.text, (v) => { 
            this.properties.text = v;
        });
        
        this.color = "#2ecc71";  // Green
    }

    onExecute() {
        this.setOutputData(0, this.properties.text);
    }
}

LiteGraph.registerNodeType(`${INPUTS}/text_input`, TextInputNode);

// Audio Output Node
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
        
        this.color = "#27ae60";
        
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

LiteGraph.registerNodeType(`${OUTPUTS}/audio_output`, AudioOutputNode);

// Language options
const languageOptions = [
    "bg", "ca", "zh", "zh-TW", "cs", "da", "nl", "en", "en-US", "en-AU", "en-GB", "en-NZ", "en-IN",
    "et", "fi", "nl-BE", "fr", "fr-CA", "de", "de-CH", "el", "hi", "hu", "id", "it", "ja", "ko",
    "lv", "lt", "ms", "no", "pl", "pt", "pt-BR", "ro", "ru", "sk", "es", "sv", "th", "tr", "uk", "vi"
];

// Speech-to-Text (STT) Node
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
        
        this.color = "rgb(200, 200, 30)";
        
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

LiteGraph.registerNodeType(`${PROCESSORS}/speech_to_text`, STTNode);

// Text-to-Speech (TTS) Node
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
        
        this.color = "#E67E22";  // Orange
        
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

LiteGraph.registerNodeType(`${PROCESSORS}/text_to_speech`, TTSNode);
