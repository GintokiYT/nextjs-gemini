import { useEffect, useRef, useState } from "react";
import IconSendButton from "../Icons/IconSendButton";
import styled from "./TextAreaChat.module.css";
import RecordingUi from "../RecordingUI/RecordingUI";
import { TbMicrophoneFilled } from "react-icons/tb";

type Props = {
  message: string
  setMessage: (message: string) => void
  handleSubmitMessage: () => void
}

export default function TextAreaChat({ message, setMessage, handleSubmitMessage }: Props) {

  const containerMessage = useRef<HTMLTextAreaElement>(null);
  const [ recording, setRecording ] = useState(false);

  const handleRecording = () => {
    setRecording(true);
  }

  useEffect(() => {
    const $containerMessage = containerMessage.current!;
    $containerMessage.style.height = '20px';
    $containerMessage.style.height = $containerMessage.scrollHeight + 'px';
  }, [message]);
 
  return (
    <>
      <div className={`w-full flex gap-2 items-center px-3 border-[2px] border-[#E6EAEF] rounded-[20px] min-h-10 py-[4px] ${styled['text-area-chat']}`}>
        <textarea 
          className={`flex-1 resize-none text-sm text-[#101820] border-none outline-none bg-transparent h-5 max-h-20 pr-1 ${styled['text-area']}`}
          placeholder="Envía un mensaje a Geor IA"
          ref={containerMessage}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div 
          className={`flex-shrink-0 ${message.trim() ? 'text-[#0375F8] cursor-pointer' : 'text-[#CBCFD8]'}`}
          onClick={() => handleSubmitMessage()}
        >
          <IconSendButton size={20}/>
        </div>
        <div 
          className="text-[#CBCFD8] hover:text-[#0375F8] cursor-pointer"
          onClick={handleRecording}
        >
          <TbMicrophoneFilled size={20}/>
        </div>
      </div>
      { recording ? <RecordingUi setRecording={setRecording} setMessage={setMessage}/> : null }
    </>
  )
}