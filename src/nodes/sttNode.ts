import { LGraphNode } from '@comfyorg/litegraph';

class STTNode extends LGraphNode {
  constructor() {
    super();
    this.title = 'Speech-to-Text';
    this.addInput('audio', 'audio');
    this.addOutput('text', 'string');

    this.properties = {
      model: '',
      language: 'en',
      audio_passthrough: false,
    };

    this.addWidget('text', 'Model', this.properties.model, (v) => {
      this.properties.model = v;
    });
    this.addWidget(
      'combo',
      'Language',
      this.properties.language,
      (v) => {
        this.properties.language = v;
      },
      { values: null /* TODO: languageOptions */ }
    );
    this.addWidget(
      'toggle',
      'Audio Passthrough',
      this.properties.audio_passthrough,
      (v) => {
        this.properties.audio_passthrough = v;
      }
    );

    this.color = '#4A90E2'; // Blue
  }

  onExecute() {
    const audioInput = this.getInputData(0);
    if (audioInput) {
      // In a real implementation, this would make an API call to the STT service
      // For now, we'll just simulate the output
      const simulatedText = `Simulated transcription of audio input (${this.properties.language})`;
      this.setOutputData(0, simulatedText);

      if (this.properties.audio_passthrough) {
        // If audio passthrough is enabled, we would also output the audio
        // This would be handled by the actual service
      }
    }
  }
}

export { STTNode };
