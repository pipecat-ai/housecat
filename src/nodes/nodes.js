import { LiteGraph } from '@comfyorg/litegraph';

const FRAME_PROCESSORS = 'frame_processors';
const FRAMES = 'frames';

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
            api_key: "",
            temperature: 0.7,
            max_tokens: 150,
            frequency_penalty: 0,
            presence_penalty: 0,
            top_p: 1,
        };
        
        this.addWidget("combo", "Model", this.properties.model, (v) => { this.properties.model = v; }, { values: ["gpt-3.5-turbo", "gpt-4", "gpt-4-turbo"] });
        this.addWidget("text", "API Key", this.properties.api_key, (v) => { this.properties.api_key = v; });
        this.addWidget("number", "Temperature", this.properties.temperature, (v) => { this.properties.temperature = v; }, { min: 0, max: 1, step: 0.1 });
        this.addWidget("number", "Max Tokens", this.properties.max_tokens, (v) => { this.properties.max_tokens = v; }, { min: 1, max: 4096, step: 1 });
        this.addWidget("number", "Frequency Penalty", this.properties.frequency_penalty, (v) => { this.properties.frequency_penalty = v; }, { min: -2, max: 2, step: 0.1 });
        this.addWidget("number", "Presence Penalty", this.properties.presence_penalty, (v) => { this.properties.presence_penalty = v; }, { min: -2, max: 2, step: 0.1 });
        this.addWidget("number", "Top P", this.properties.top_p, (v) => { this.properties.top_p = v; }, { min: 0, max: 1, step: 0.1 });
        
        this.color = "rgb(250, 5, 10)";  // Blue
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

LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/llm`, LLMNode);

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
LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/text_to_speech`, TextToSpeechNode);

// Audio Input Node
class AudioInputNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "Audio Input";
        this.addOutput("audio", "audio");
        
        this.properties = {
            input_source: "local",
            sample_rate: 16000,
            channels: 1,
            livekit_url: "",
            livekit_token: "",
            daily_url: "",
            daily_token: ""
        };
        
        this.addWidget("combo", "Input Source", this.properties.input_source, (v) => { 
            this.properties.input_source = v;
            this.onInputSourceChange(v);
        }, { values: ["local", "livekit", "daily"] });
        
        this.color = "#4B0082";  // Indigo
        
        this.onInputSourceChange(this.properties.input_source);
    }

    onInputSourceChange(value) {
        // Store the first widget (Input Source)
        const inputSourceWidget = this.widgets[0];
        
        // Clear all widgets
        this.widgets = [];
        
        // Re-add the Input Source widget
        this.widgets.push(inputSourceWidget);

        // Add widgets based on the selected input source
        switch (value) {
            case "local":
                this.addWidget("number", "Sample Rate", this.properties.sample_rate, (v) => { this.properties.sample_rate = v; }, { min: 8000, max: 48000, step: 100 });
                this.addWidget("number", "Channels", this.properties.channels, (v) => { this.properties.channels = v; }, { min: 1, max: 2, step: 1 });
                break;
            case "livekit":
                this.addWidget("text", "LiveKit URL", this.properties.livekit_url, (v) => { this.properties.livekit_url = v; });
                this.addWidget("text", "LiveKit Token", this.properties.livekit_token, (v) => { this.properties.livekit_token = v; });
                break;
            case "daily":
                this.addWidget("text", "Daily URL", this.properties.daily_url, (v) => { this.properties.daily_url = v; });
                this.addWidget("text", "Daily Token", this.properties.daily_token, (v) => { this.properties.daily_token = v; });
                break;
        }

        this.setDirtyCanvas(true, true);
    }

    onExecute() {
        // In a real implementation, this would process incoming audio
        // and push it to the output. Here, we're just simulating the interface.
        this.setOutputData(0, { type: "audio", data: "simulated_audio_data", source: this.properties.input_source });
    }
}

LiteGraph.registerNodeType(`${FRAMES}/audio_input`, AudioInputNode);

// Audio Input Transport Node
class AudioInputTransportNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "Audio Input Transport";
        this.addInput("audio", "audio");
        this.addOutput("audio", "audio");
        this.addOutput("vad", "vad");
        
        this.addProperty("vad_enabled", false);
        this.addProperty("vad_audio_passthrough", false);
        
        this.addWidget("toggle", "VAD Enabled", this.properties.vad_enabled, (v) => { this.properties.vad_enabled = v; });
        this.addWidget("toggle", "VAD Audio Passthrough", this.properties.vad_audio_passthrough, (v) => { this.properties.vad_audio_passthrough = v; });
        
        this.color = "#2980b9";
    }

    onExecute() {
        const audioInput = this.getInputData(0);
        if (audioInput) {
            this.setOutputData(0, audioInput);
            if (this.properties.vad_enabled) {
                this.setOutputData(1, { type: "vad", state: "QUIET" });
            }
        }
    }
}

LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/audio_input_transport`, AudioInputTransportNode);

// Audio Output Transport Node
class AudioOutputTransportNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "Audio Output Transport";
        this.addInput("audio", "audio");
        
        this.addProperty("audio_out_enabled", true);
        this.addProperty("audio_out_is_live", false);
        this.addProperty("audio_out_sample_rate", 16000);
        this.addProperty("audio_out_channels", 1);
        this.addProperty("audio_out_bitrate", 96000);
        
        this.addWidget("toggle", "Audio Out Enabled", this.properties.audio_out_enabled, (v) => { this.properties.audio_out_enabled = v; });
        this.addWidget("toggle", "Is Live", this.properties.audio_out_is_live, (v) => { this.properties.audio_out_is_live = v; });
        this.addWidget("number", "Sample Rate", this.properties.audio_out_sample_rate, (v) => { this.properties.audio_out_sample_rate = v; }, { min: 8000, max: 48000, step: 100 });
        this.addWidget("number", "Channels", this.properties.audio_out_channels, (v) => { this.properties.audio_out_channels = v; }, { min: 1, max: 2, step: 1 });
        this.addWidget("number", "Bitrate", this.properties.audio_out_bitrate, (v) => { this.properties.audio_out_bitrate = v; }, { min: 8000, max: 320000, step: 1000 });
        
        this.color = "#27ae60";
    }

    onExecute() {
        const audioInput = this.getInputData(0);
        if (audioInput) {
            // In a real implementation, this would process the audio
            // and send it to the output transport. Here, we're just simulating the interface.
            console.log("Simulated audio output:", audioInput);
        }
    }
}

LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/audio_output_transport`, AudioOutputTransportNode);

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
            model: "",
            language: "en",
            audio_passthrough: false
        };
        
        this.addWidget("text", "Model", this.properties.model, (v) => { this.properties.model = v; });
        this.addWidget("combo", "Language", this.properties.language, (v) => { this.properties.language = v; }, { values: languageOptions });
        this.addWidget("toggle", "Audio Passthrough", this.properties.audio_passthrough, (v) => { this.properties.audio_passthrough = v; });
        
        this.color = "rgb(200, 200, 30)";  // Blue
    }

    onExecute() {
        const audioInput = this.getInputData(0);
        if (audioInput) {
            // In a real implementation, this would make an API call to the STT service
            // For now, we'll just simulate the output
            const simulatedText = `Simulated transcription of audio input (${this.properties.language})`;
            this.setOutputData(0, simulatedText);
            
            if (this.properties.audio_passthrough) {
                // If audio passthrough is enabled, we would also output the audio
                // This would be handled by the actual service
            }
        }
    }
}

LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/speech_to_text`, STTNode);

// Text-to-Speech (TTS) Node
class TTSNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "Text-to-Speech";
        this.addInput("text", "string");
        this.addOutput("audio", "audio");
        
        this.properties = {
            service: "cartesia",
            model: "",
            voice: "",
            language: "en",
            sample_rate: 16000,
            aggregate_sentences: true,
            push_text_frames: true,
            // Cartesia specific
            cartesia_api_key: "",
            cartesia_version: "2024-06-10",
            cartesia_url: "wss://api.cartesia.ai/tts/websocket",
            // Deepgram specific
            deepgram_api_key: "",
            deepgram_encoding: "linear16",
            // Eleven Labs specific (placeholder)
            eleven_labs_api_key: ""
        };
        
        this.addWidget("combo", "Service", this.properties.service, (v) => { 
            this.properties.service = v;
            this.onServiceChange(v);
        }, { values: ["cartesia", "deepgram", "eleven_labs"] });
        
        this.addWidget("text", "Model", this.properties.model, (v) => { this.properties.model = v; });
        this.addWidget("text", "Voice", this.properties.voice, (v) => { this.properties.voice = v; });
        this.addWidget("combo", "Language", this.properties.language, (v) => { this.properties.language = v; }, { values: languageOptions });
        this.addWidget("number", "Sample Rate", this.properties.sample_rate, (v) => { this.properties.sample_rate = v; }, { min: 8000, max: 48000, step: 100 });
        this.addWidget("toggle", "Aggregate Sentences", this.properties.aggregate_sentences, (v) => { this.properties.aggregate_sentences = v; });
        this.addWidget("toggle", "Push Text Frames", this.properties.push_text_frames, (v) => { this.properties.push_text_frames = v; });
        
        this.color = "#E67E22";  // Orange
        
        this.onServiceChange(this.properties.service);
    }

    onServiceChange(value) {
        // Store the first 7 widgets (common widgets)
        const commonWidgets = this.widgets.slice(0, 7);
        
        // Clear all widgets
        this.widgets = [];
        
        // Re-add the common widgets
        this.widgets.push(...commonWidgets);

        // Add service-specific widgets
        switch (value) {
            case "cartesia":
                this.addWidget("text", "Cartesia API Key", this.properties.cartesia_api_key, (v) => { this.properties.cartesia_api_key = v; });
                this.addWidget("text", "Cartesia Version", this.properties.cartesia_version, (v) => { this.properties.cartesia_version = v; });
                this.addWidget("text", "Cartesia URL", this.properties.cartesia_url, (v) => { this.properties.cartesia_url = v; });
                break;
            case "deepgram":
                this.addWidget("text", "Deepgram API Key", this.properties.deepgram_api_key, (v) => { this.properties.deepgram_api_key = v; });
                this.addWidget("text", "Deepgram Encoding", this.properties.deepgram_encoding, (v) => { this.properties.deepgram_encoding = v; });
                break;
            case "eleven_labs":
                this.addWidget("text", "Eleven Labs API Key", this.properties.eleven_labs_api_key, (v) => { this.properties.eleven_labs_api_key = v; });
                break;
        }

        this.setDirtyCanvas(true, true);
    }

    onExecute() {
        const textInput = this.getInputData(0);
        if (textInput) {
            // In a real implementation, this would make an API call to the selected TTS service
            // For now, we'll just simulate the output
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

LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/text_to_speech`, TTSNode);

// Text Node
class TextNode extends LiteGraph.LGraphNode {
    constructor() {
        super();
        this.title = "Text";
        this.addOutput("text", "string");
        
        this.properties = {
            text: ""
        };
        
        this.color = "rgb(110, 250, 100)";  // Green
        this.resizable = true;
        this.size = [200, 100];  // Set an initial size

        this.createTextWidget();
    }

    createTextWidget() {
        const widget = this.addWidget("text", "Text", this.properties.text, (v) => {
            this.properties.text = v;
        });
        widget.customWidget = this.createTextArea.bind(this);
        this.textWidget = widget;
    }

    createTextArea(widget, value) {
        const element = document.createElement("textarea");
        element.className = "text-node-textarea";
        element.value = value;
        element.style.width = "100%";
        element.style.height = "100%";
        element.addEventListener("input", () => {
            this.properties.text = element.value;
            widget.value = element.value;
        });
        return element;
    }

    onResize(size) {
        if (this.textWidget && this.textWidget.customWidget) {
            const element = this.textWidget.customWidget(this.textWidget, this.textWidget.value);
            element.style.width = (size[0] - 20) + "px";
            element.style.height = (size[1] - 40) + "px";
        }
    }

    onExecute() {
        this.setOutputData(0, this.properties.text);
    }

    // Serialize the node data
    serialize() {
        const data = super.serialize();
        data.properties = { text: this.properties.text };
        return data;
    }

    // Deserialize and configure the node
    configure(data) {
        super.configure(data);
        if (data.properties && data.properties.text) {
            this.properties.text = data.properties.text;
            if (this.textWidget) {
                this.textWidget.value = this.properties.text;
            }
        }
    }
}

LiteGraph.registerNodeType(`${FRAMES}/text`, TextNode);
