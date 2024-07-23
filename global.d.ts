interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly [index: number]: SpeechRecognitionAlternative;
  readonly length: number;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

declare var webkitSpeechRecognition: {
  new (): SpeechRecognition;
};

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  serviceURI: string;
  start(): void;
  stop(): void;
  abort(): void;
  onaudiostart: (this: SpeechRecognition, ev: Event) => any;
  onsoundstart: (this: SpeechRecognition, ev: Event) => any;
  onspeechstart: (this: SpeechRecognition, ev: Event) => any;
  onspeechend: (this: SpeechRecognition, ev: Event) => any;
  onsoundend: (this: SpeechRecognition, ev: Event) => any;
  onaudioend: (this: SpeechRecognition, ev: Event) => any;
  onresult: (this: SpeechRecognition, ev: SpeechRecognitionEvent) => any;
  onnomatch: (this: SpeechRecognition, ev: SpeechRecognitionEvent) => any;
  onerror: (this: SpeechRecognition, ev: SpeechRecognitionEvent) => any;
  onstart: (this: SpeechRecognition, ev: Event) => any;
  onend: (this: SpeechRecognition, ev: Event) => any;
}
