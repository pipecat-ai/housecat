import { LGraphNode } from '@comfyorg/litegraph';

import { Language, TTSServiceType } from '../types';

class TTSNode extends LGraphNode {
  constructor() {
    super();
    this.title = 'Text-to-Speech';
    this.addInput('text', 'string');
    this.addOutput('audio', 'audio');

    this.properties = {
      service: TTSServiceType.Cartesia,
      model: '',
      voice: '',
      language: 'en',
      sample_rate: 16000,
      aggregate_sentences: true,
      push_text_frames: true,
      // Cartesia specific
      cartesia_api_key: '',
      cartesia_version: '2024-06-10',
      cartesia_url: 'wss://api.cartesia.ai/tts/websocket',
      // Deepgram specific
      deepgram_api_key: '',
      deepgram_encoding: 'linear16',
      // Eleven Labs specific (placeholder)
      eleven_labs_api_key: '',
    };

    this.addWidget(
      'combo',
      'Service',
      this.properties.service,
      (v) => {
        this.properties.service = v;
        this.onServiceChange(v);
      },
      { values: [...Object.values(TTSServiceType)] }
    );

    this.addWidget('text', 'Model', this.properties.model, (v) => {
      this.properties.model = v;
    });
    this.addWidget('text', 'Voice', this.properties.voice, (v) => {
      this.properties.voice = v;
    });
    this.addWidget(
      'combo',
      'Language',
      this.properties.language,
      (v) => {
        this.properties.language = v;
      },
      { values: [...Object.values(Language)] }
    );
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
      'toggle',
      'Aggregate Sentences',
      this.properties.aggregate_sentences,
      (v) => {
        this.properties.aggregate_sentences = v;
      }
    );
    this.addWidget(
      'toggle',
      'Push Text Frames',
      this.properties.push_text_frames,
      (v) => {
        this.properties.push_text_frames = v;
      }
    );

    this.color = '#E67E22'; // Orange

    this.onServiceChange(this.properties.service);
  }

  onServiceChange(value: TTSServiceType) {
    // Store the first 7 widgets (common widgets)
    const commonWidgets = this.widgets.slice(0, 7);

    // Clear all widgets
    this.widgets = [];

    // Re-add the common widgets
    this.widgets.push(...commonWidgets);

    // Add service-specific widgets
    switch (value) {
      case TTSServiceType.Cartesia:
        this.addWidget(
          'text',
          'Cartesia API Key',
          this.properties.cartesia_api_key,
          (v) => {
            this.properties.cartesia_api_key = v;
          }
        );
        this.addWidget(
          'text',
          'Cartesia Version',
          this.properties.cartesia_version,
          (v) => {
            this.properties.cartesia_version = v;
          }
        );
        this.addWidget(
          'text',
          'Cartesia URL',
          this.properties.cartesia_url,
          (v) => {
            this.properties.cartesia_url = v;
          }
        );
        break;
      case TTSServiceType.Deepgram:
        this.addWidget(
          'text',
          'Deepgram API Key',
          this.properties.deepgram_api_key,
          (v) => {
            this.properties.deepgram_api_key = v;
          }
        );
        this.addWidget(
          'text',
          'Deepgram Encoding',
          this.properties.deepgram_encoding,
          (v) => {
            this.properties.deepgram_encoding = v;
          }
        );
        break;
      case TTSServiceType.ElevenLabs:
        this.addWidget(
          'text',
          'Eleven Labs API Key',
          this.properties.eleven_labs_api_key,
          (v) => {
            this.properties.eleven_labs_api_key = v;
          }
        );
        break;
    }

    this.setDirtyCanvas(true, true);
  }

  onExecute() {
    const textInput = this.getInputData(0);
    if (textInput) {
      // In a real implementation, this would make an API call to the selected TTS service
      // For now, we'll just simulate the output
      const simulatedAudio = {
        type: 'audio',
        data: `simulated_audio_data_${this.properties.service}_${this.properties.language}`,
      };
      this.setOutputData(0, simulatedAudio);

      if (this.properties.push_text_frames) {
        // If push text frames is enabled, we would also output the text
        // This would be handled by the actual service
      }
    }
  }
}

export { TTSNode };
