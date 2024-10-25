import { LiteGraph } from '@comfyorg/litegraph';

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

export { TextNode };
