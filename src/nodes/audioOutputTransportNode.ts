import { LGraphNode } from '@comfyorg/litegraph';

class AudioOutputTransportNode extends LGraphNode {
  constructor() {
    super();
    this.title = 'Audio Output Transport';
    this.addInput('audio', 'audio');

    this.addProperty('audio_out_enabled', true, 'boolean');
    this.addProperty('audio_out_is_live', false, 'boolean');
    this.addProperty('audio_out_sample_rate', 16000, 'number');
    this.addProperty('audio_out_channels', 1, 'number');
    this.addProperty('audio_out_bitrate', 96000, 'number');

    this.addWidget(
      'toggle',
      'Audio Out Enabled',
      this.properties.audio_out_enabled,
      (v) => {
        this.properties.audio_out_enabled = v;
      }
    );
    this.addWidget(
      'toggle',
      'Is Live',
      this.properties.audio_out_is_live,
      (v) => {
        this.properties.audio_out_is_live = v;
      }
    );
    this.addWidget(
      'number',
      'Sample Rate',
      this.properties.audio_out_sample_rate,
      (v) => {
        this.properties.audio_out_sample_rate = v;
      },
      { min: 8000, max: 48000, step: 100 }
    );
    this.addWidget(
      'number',
      'Channels',
      this.properties.audio_out_channels,
      (v) => {
        this.properties.audio_out_channels = v;
      },
      { min: 1, max: 2, step: 1 }
    );
    this.addWidget(
      'number',
      'Bitrate',
      this.properties.audio_out_bitrate,
      (v) => {
        this.properties.audio_out_bitrate = v;
      },
      { min: 8000, max: 320000, step: 1000 }
    );

    this.color = '#27ae60';
  }

  onExecute() {
    const audioInput = this.getInputData(0);
    if (audioInput) {
      // In a real implementation, this would process the audio
      // and send it to the output transport. Here, we're just simulating the interface.
      console.log('Simulated audio output:', audioInput);
    }
  }
}

export { AudioOutputTransportNode };
