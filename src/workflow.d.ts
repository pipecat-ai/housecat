import { LGraph, LGraphNode, SerializedLGraphNode } from '@comfyorg/litegraph';

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

export type exportWorkflowType = (graph: LGraph) => Workflow;
export type loadWorkflowType = (data: Workflow) => void;
