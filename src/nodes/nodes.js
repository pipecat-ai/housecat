import { LiteGraph } from '@comfyorg/litegraph';
import { LLMNode } from './LLMNode';
import { AudioInputNode } from './AudioInputNode';
import { TextInputNode } from './TextInputNode';
import { AudioOutputNode } from './AudioOutputNode';
import { STTNode } from './STTNode';
import { TTSNode } from './TTSNode';

const PROCESSORS = 'processors';
const INPUTS = 'inputs';
const OUTPUTS = 'outputs';

LiteGraph.registerNodeType(`${PROCESSORS}/llm`, LLMNode);
LiteGraph.registerNodeType(`${INPUTS}/audio_input`, AudioInputNode);
LiteGraph.registerNodeType(`${INPUTS}/text_input`, TextInputNode);
LiteGraph.registerNodeType(`${OUTPUTS}/audio_output`, AudioOutputNode);
LiteGraph.registerNodeType(`${PROCESSORS}/speech_to_text`, STTNode);
LiteGraph.registerNodeType(`${PROCESSORS}/text_to_speech`, TTSNode);
