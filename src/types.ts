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
  Bulgarian = 'bg',
  Catalan = 'ca',
  Chinese = 'zh',
  ChineseTaiwan = 'zh-TW',
  Czech = 'cs',
  Danish = 'da',
  Dutch = 'nl',
  English = 'en',
  EnglishUS = 'en-US',
  EnglishAU = 'en-AU',
  EnglishGB = 'en-GB',
  EnglishNZ = 'en-NZ',
  EnglishIN = 'en-IN',
  Estonian = 'et',
  Finnish = 'fi',
  DutchBelgium = 'nl-BE',
  French = 'fr',
  FrenchCA = 'fr-CA',
  German = 'de',
  GermanCH = 'de-CH',
  Greek = 'el',
  Hindi = 'hi',
  Hungarian = 'hu',
  Indonesian = 'id',
  Italian = 'it',
  Japanese = 'ja',
  Korean = 'ko',
  Latvian = 'lv',
  Lithuanian = 'lt',
  Malay = 'ms',
  Norwegian = 'no',
  Polish = 'pl',
  Portuguese = 'pt',
  PortugueseBrasil = 'pt-BR',
  Romanian = 'ro',
  Russian = 'ru',
  Slovak = 'sk',
  Swedish = 'sv',
  Thai = 'th',
  Turkish = 'tr',
  Ukrainian = 'uk',
  Vietnamese = 'vi',
}

export enum TTSServiceType {
  Cartesia = 'cartesia',
  Deepgram = 'deepgram',
  ElevenLabs = 'eleven_labs',
}
