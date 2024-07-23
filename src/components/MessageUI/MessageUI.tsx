import { Message } from "@/interfaces";
import IconGeorLogo from "../Icons/IconGeorLogo";
import { memo } from "react";

type Props = {
  message: Message
};

const MessageUser = ({ message }: { message: Message }) => {
  return (
    <div className={`px-4 py-[9px] ${message.emit === 'user' ? 'bg-[#F1F2F3] ml-auto' : ' bg-white'} rounded-[20px] inline-block`}>
      <p className="text-sm text-[#101820] font-normal leading-[18px]">{message.message}</p>
    </div>
  );
};

const MessageGeor = ({ message }: { message: Message }) => {
  return (
    <div className={`py-[9px] ${message.emit === 'user' ? 'bg-[#F1F2F3] ml-auto' : ' bg-white'} rounded-[20px] inline-block`}>
      <div className="flex gap-2">
        <div className="w-8 h-8 border-[#F1F2F3] border-[.75px] rounded-[32px] flex flex-col items-center justify-center">
          <IconGeorLogo size={20}/>
        </div>
        <div className="message-ia" dangerouslySetInnerHTML={{ __html: message.message }}></div>
      </div>
    </div>
  );
};

const MemoizedMessageUser = memo(MessageUser);
const MemoizedMessageGeor = memo(MessageGeor);

export default function MessageUI({ message }: Props) {
  return (
    <div className="flex">
      {message.emit === 'user' 
        ? <MemoizedMessageUser message={message}/>
        : <MemoizedMessageGeor message={message}/>
      }
    </div>
  );
}