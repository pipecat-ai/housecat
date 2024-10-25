export interface Workflow {
  nodes: NodeData[];
  links: LinkData[];
  groups: any[];
  config: any;
  version: number;
}

export interface NodeData {
  id: number;
  type: string;
  pos: [number, number];
  properties: any;
  inputs?: any;
}

export type LinkData = [number, number, number, number, number, string];
