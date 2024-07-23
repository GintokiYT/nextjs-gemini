"use client"

import { v4 as uuid } from 'uuid';
import { useCallback, useState } from 'react';

import HeaderChat from '@/src/components/HeaderChat/HeaderChat';
import TextAreaChat from '@/src/components/TextAreaChat/TextAreaChat';
import MessagesUI from '@/src/components/MessagesUI/MessagesUI';

import { Message } from '@/interfaces';

export default function Home() {

  const [ message, setMessage ] = useState<string>('');
  const [ messages, setMessages ] = useState<Message[]>([]);

  const handleSubmitMessage = useCallback(async () => {
    
    if (!message.trim()) return;

    let newMessage: Message = {
      id: uuid(),
      message: message,
      emit: 'user'
    };

    setMessages(state => [...state, newMessage]);
    setMessage('');

    const response = await fetch('/api/chatgpt', {
      method: 'POST',
      body: JSON.stringify({ message: message })
    });
    const data = await response.json();

    newMessage = {
      id: uuid(),
      emit: 'geor',
      message: data.answer
    };

    setMessages(state => [...state, newMessage]);
  }, [message]);

  return (
    <div className="w-[390px] m-auto h-full bg-white flex flex-col">
      <HeaderChat />
      <div className='flex-1 w-full h-full p-4 flex overflow-hidden'>
        <div className='flex-1 overflow-y-auto'>
          <MessagesUI messages={messages}/>
        </div>
      </div>
      <div className='flex-shrink-0 bg-white p-4'>
        <TextAreaChat 
          message={message}
          setMessage={setMessage}
          handleSubmitMessage={handleSubmitMessage}
        />
      </div>
    </div>
  );
}