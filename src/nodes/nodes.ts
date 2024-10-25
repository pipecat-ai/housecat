import { LiteGraph } from '@comfyorg/litegraph';
import { AudioInputNode } from './audioInputNode';
import { AudioInputTransportNode } from './audioInputTransportNode';
import { AudioOutputTransportNode } from './audioOutputTransportNode';
import { LLMNode } from './llmNode';
import { STTNode } from './sttNode';
import { TextNode } from './textNode';
import { TextToSpeechNode } from './textToSpeechNode';

const FRAME_PROCESSORS = 'frame_processors';
const FRAMES = 'frames';

LiteGraph.registerNodeType(`${FRAMES}/audio_input`, AudioInputNode);
LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/audio_input_transport`, AudioInputTransportNode);
LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/audio_output_transport`, AudioOutputTransportNode);
LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/llm`, LLMNode);
LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/speech_to_text`, STTNode);
LiteGraph.registerNodeType(`${FRAMES}/text`, TextNode);
LiteGraph.registerNodeType(`${FRAME_PROCESSORS}/text_to_speech`, TextToSpeechNode);
