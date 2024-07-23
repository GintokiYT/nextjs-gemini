"use client"

import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuid } from 'uuid';
import { useRef, useState } from 'react';
import Image from 'next/image';

interface Message {
  id: string
  emit: string
  message: string
}

export default function Home() {

  const containerMessage = useRef(null);

  const [ message, setMessage ] = useState<string>('');
  const [ messages, setMessages ] = useState<Message[]>([]);

  const genAI = new GoogleGenerativeAI("AIzaSyC2acD6LIsqF-KtuzC2SZHv_mHAreTCX54");

  const run = async (question: string) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = question
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  }

  const handleQuestion = async () => {

    const container = containerMessage.current! as HTMLDivElement;
    let lastItem: any;

    let newMessageUser: Message = {
      id: uuid(),
      emit: 'me',
      message: message
    }

    setMessage('');

    setMessages( state => [...state, newMessageUser] );

    lastItem = container.lastElementChild;
    setTimeout(() => {
      lastItem.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    
    const response = await run(newMessageUser.message);
    
    let newMessageIa: Message = {
      id: uuid(),
      emit: 'ia',
      message: response
    }

    setMessages( state => [...state, newMessageIa] );

    lastItem = container.lastElementChild;
    setTimeout(() => {
      lastItem.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  return (
    <div className="container-message bg-[#1588F2] flex flex-col justify-between relative">
      <div className='bg-[#0375F8]'>
        <p className='py-2 px-4 text-lg flex gap-4 items-center text-white font-medium'>
          <Image 
            className='rounded-full'
            width={48} 
            height={48} 
            src="/logo.png" 
            alt='logo'
          ></Image>
          <span>Asistente Geor IA / <span className='font-black'>GEMINI</span></span>
        </p>
      </div>
      <div className='absolute w-full h-full grid place-items-center opacity-85'>
          <Image
            width={100}
            height={100}
            src="/logo01.png"
            alt='Logo'
          ></Image>
        </div>
      <div className='flex-1 flex flex-col gap-2 overflow-y-auto relative z-10' ref={containerMessage}>
        <br />
        { messages.map( message => (
          <div key={message.id} className={`${message.emit === 'ia'? 'bg-[#070e27]' : 'bg-[#005FDC] ml-auto'} max-w-80 mx-2 rounded-md text-white py-1`}>
            <p className='px-2 py-1'>
              <span className='font-bold'>{ message.emit === 'me' ? 'Tu:' : 'Geor: ' }</span> {message.message}</p>
          </div>
        )) }
        <br />
      </div>
      <div className="w-full flex flex-row relative">
        <input 
          className="w-full px-4 py-2 border-none outline-none" 
          type="text" 
          placeholder="Ingresa tu pregunta"
          value={message}
          onChange={ (event) => setMessage(event.target.value) }
        />
        <button 
          className="cursor-pointer px-4 bg-[#0375F8] text-white" 
          type="button"
          onClick={handleQuestion}
        >Enviar</button>
      </div>
    </div>
  );
}
