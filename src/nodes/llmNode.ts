import { LiteGraph } from '@comfyorg/litegraph';

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

export { LLMNode };
