from .workflow-translator import LlmNode

# Map workflow types to their corresponding Python classes
WORKFLOW_MAPPING = {
    "processors/llm": LlmNode,
}

def get_processor_class(node_type: str) -> type[FrameProcessor]:
    return WORKFLOW_MAPPING.get(node_type, FrameProcessor)