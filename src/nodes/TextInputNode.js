import { LiteGraph } from '@comfyorg/litegraph';
import { colors } from '../configs';

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
        
        this.color = colors.greenLight;
    }

    onExecute() {
        this.setOutputData(0, this.properties.text);
    }
}

export { TextInputNode };
