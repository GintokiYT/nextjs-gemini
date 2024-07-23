import { TbMicrophoneFilled, TbMicrophoneOff } from "react-icons/tb";
import { useState, useRef } from "react";

type Props = {
  setRecording: (recording: boolean) => void;
  setMessage: (message: string) => void;
}

const RecordingUi: React.FC<Props> = ({ setRecording, setMessage }) => {
  const [init, setInit] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const initializeRecognition = () => {
    let recognition: SpeechRecognition;

    if ('webkitSpeechRecognition' in window) {
      recognition = new webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
      recognition = new (window as any).SpeechRecognition();
    } else {
      alert('Tu navegador no soporta la API de reconocimiento de voz');
      return null;
    }

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'es-ES';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setMessage(transcript);
    };

    recognition.onerror = (event: Event) => {
      console.error('Error en el reconocimiento de voz:', event);
    };

    return recognition;
  };

  const handlePlayRecording = () => {
    setInit(true);
    setRecording(true);
    if (!recognitionRef.current) {
      recognitionRef.current = initializeRecognition();
    }
    recognitionRef.current?.start();
  };

  const handleStopRecording = () => {
    setInit(false);
    recognitionRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="w-full h-screen z-10 fixed top-0 left-0 bg-[rgba(0,0,0,.4)] flex flex-col justify-center items-center">
      {init ? (
        <TbMicrophoneOff className="cursor-pointer" size={80} onClick={handleStopRecording} />
      ) : (
        <TbMicrophoneFilled className="cursor-pointer" size={80} onClick={handlePlayRecording} />
      )}
    </div>
  );
};

export default RecordingUi;
