import { LGraphNode } from '@comfyorg/litegraph';

class AudioInputTransportNode extends LGraphNode {
  constructor() {
    super();
    this.title = 'Audio Input Transport';
    this.addInput('audio', 'audio');
    this.addOutput('audio', 'audio');
    this.addOutput('vad', 'vad');

    this.addProperty('vad_enabled', false, 'boolean');
    this.addProperty('vad_audio_passthrough', false, 'boolean');

    this.addWidget(
      'toggle',
      'VAD Enabled',
      this.properties.vad_enabled,
      (v) => {
        this.properties.vad_enabled = v;
      }
    );
    this.addWidget(
      'toggle',
      'VAD Audio Passthrough',
      this.properties.vad_audio_passthrough,
      (v) => {
        this.properties.vad_audio_passthrough = v;
      }
    );

    this.color = '#2980b9';
  }

  onExecute() {
    const audioInput = this.getInputData(0);
    if (audioInput) {
      this.setOutputData(0, audioInput);
      if (this.properties.vad_enabled) {
        this.setOutputData(1, { type: 'vad', state: 'QUIET' });
      }
    }
  }
}

export { AudioInputTransportNode };
