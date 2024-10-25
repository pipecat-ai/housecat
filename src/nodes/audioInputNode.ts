import { LGraphNode } from '@comfyorg/litegraph';

export enum InputSource {
  Local = 'local',
  LiveKit = 'livekit',
  Daily = 'daily',
}

class AudioInputNode extends LGraphNode {
  constructor() {
    super();
    this.title = 'Audio Input';
    this.addOutput('audio', 'audio');

    this.properties = {
      input_source: 'local',
      sample_rate: 16000,
      channels: 1,
      livekit_url: '',
      livekit_token: '',
      daily_url: '',
      daily_token: '',
    };

    this.addWidget(
      'combo',
      'Input Source',
      this.properties.input_source,
      (v) => {
        this.properties.input_source = v;
        this.onInputSourceChange(v);
      },
      { values: ['local', 'livekit', 'daily'] }
    );

    this.color = '#4B0082'; // Indigo

    this.onInputSourceChange(this.properties.input_source);
  }

  onInputSourceChange(value: InputSource) {
    // Store the first widget (Input Source)
    const inputSourceWidget = this.widgets[0];

    // Clear all widgets
    this.widgets = [];

    // Re-add the Input Source widget
    this.widgets.push(inputSourceWidget);

    // Add widgets based on the selected input source
    switch (value) {
      case InputSource.Local:
        this.addWidget(
          'number',
          'Sample Rate',
          this.properties.sample_rate,
          (v) => {
            this.properties.sample_rate = v;
          },
          { min: 8000, max: 48000, step: 100 }
        );
        this.addWidget(
          'number',
          'Channels',
          this.properties.channels,
          (v) => {
            this.properties.channels = v;
          },
          { min: 1, max: 2, step: 1 }
        );
        break;
      case InputSource.LiveKit:
        this.addWidget(
          'text',
          'LiveKit URL',
          this.properties.livekit_url,
          (v) => {
            this.properties.livekit_url = v;
          }
        );
        this.addWidget(
          'text',
          'LiveKit Token',
          this.properties.livekit_token,
          (v) => {
            this.properties.livekit_token = v;
          }
        );
        break;
      case InputSource.Daily:
        this.addWidget('text', 'Daily URL', this.properties.daily_url, (v) => {
          this.properties.daily_url = v;
        });
        this.addWidget(
          'text',
          'Daily Token',
          this.properties.daily_token,
          (v) => {
            this.properties.daily_token = v;
          }
        );
        break;
    }

    this.setDirtyCanvas(true, true);
  }

  onExecute() {
    // In a real implementation, this would process incoming audio
    // and push it to the output. Here, we're just simulating the interface.
    this.setOutputData(0, {
      type: 'audio',
      data: 'simulated_audio_data',
      source: this.properties.input_source,
    });
  }
}

export { AudioInputNode };
