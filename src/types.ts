import { LGraph, LGraphNode, SerializedLGraphNode } from '@comfyorg/litegraph';

// WORKFLOW TYPES

export interface Workflow {
  nodes: SerializedLGraphNode<LGraphNode>[];
  links: LinkData[];
  groups: any[];
  config: any;
  version: number;
}

export interface NodeData extends SerializedLGraphNode<LGraphNode> {}

// export interface NodeData {
//   id: number;
//   type: string;
//   pos: [number, number];
//   properties: any;
//   inputs?: any;
// }

export type LinkData = [number, number, number, number, number, string];

// OTHER TYPES

export type exportWorkflowType = (graph: LGraph) => Workflow;
export type loadWorkflowType = (data: Workflow) => void;

export enum Language {
  English = 'en',
  Spanish = 'es',
  French = 'fr',
  German = 'de',
  Polish = 'pl',
}

export enum TTSServiceType {
  Cartesia = 'cartesia',
  Deepgram = 'deepgram',
  ElevenLabs = 'eleven_labs',
}
