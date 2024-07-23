import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.API_KEY
});

const addUnansweredQuestions = async (question: string) => {
  const unansweredQuestions = await prisma.unansweredQuestions.findFirst({
    where: {
      name: question
    }
  });

  if(unansweredQuestions) {
    await prisma.unansweredQuestions.update({
      where: {
        id: unansweredQuestions.id
      },
      data: {
        count: unansweredQuestions.count + 1
      }
    })
  } else {
    await prisma.unansweredQuestions.createMany({
      data: {
        name: question,
        count: 1
      }
    })
  }
}

const chatgpt = async (question: string) => {
  let questions: any[] = [];
  let statusRequestFrequentQuestions = true;
  let URL_FREQUENT_QUESTIONS = process.env.NEXT_PUBLIC_URL_FREQUENT_QUESTIONS + '/api/frequent-questions';

  while(statusRequestFrequentQuestions) {
    const response = await fetch(URL_FREQUENT_QUESTIONS, { next: { revalidate: 3600 }});
  
    if (!response.ok) {
      statusRequestFrequentQuestions = false;
      break;
    }

    const data = await response.json();
    questions = [...questions, ...data.data]
    if(data.next_page_url) {
      URL_FREQUENT_QUESTIONS = data.next_page_url;
    } else {
      statusRequestFrequentQuestions = false;
    }
  }
  
  questions = questions.map( (ele: any) => {
    return {
      id: ele.id,
      pregunta: ele.title,
      respuesta: ele.description,
      video: ele.attach
    }
  })
  
  //* Saludo queda pendiente
  // questions.push({
  //   id: -9999,
  //   pregunta: 'hola',
  //   respuesta: 'Bienvenido a Geor en que te puedo ayudar hoy.'
  // });

  const cloneQuestions = questions.map( (question: { id: number, pregunta: string, respuesta: string, video: string }) => {
    return { id: question.id, pregunta: question.pregunta.toLocaleLowerCase() }
  })

  let prompt = {
    "prompt": "Ayudame a responder a mis usuarios, devuelve el id de la pregunta encontrada.",
    "data": `${JSON.stringify(cloneQuestions)}`
  };

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: JSON.stringify(prompt) },
      { role: "user", content: question.toLocaleLowerCase() }
    ],
    model: "gpt-3.5-turbo",
  });
  
  let content: any = completion.choices[0].message.content;

  if(content) {
    content = parseInt(content, 10);

    if(isNaN(content)) {
      content = "null";
    } else {
      content = String(content);
    }
    if(content.trim().toLowerCase().includes('null'.trim())) {
      console.log('Esta pregunta hay que guardar');
      await addUnansweredQuestions(question);
    }

    if(content.trim() === "null") {
      return '<p>No tengo aún respuesta para esa pregunta.</p>';
    } else {
      let response = "";
      const found = questions.find( question => question.id === Number(content.trim()));
        
      if(found) {
        response += found.respuesta;
        if(found.video) {
          response += `<iframe class="w-full rounded-md" src="https://www.youtube.com/embed/${found.video}" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>`
        }
      } else {
        response = "<p>No tengo aún respuesta para esa pregunta.</p>";
      }
      return response;
    }
  } else {
    const response = "<p>No tengo aún respuesta para esa pregunta.</p>";
    return response;
  }
} 


export async function POST(request: Request) {
  const { message } = await request.json();
  let answer = await chatgpt(message);

  return NextResponse.json({
    answer
  })
}