import { Message } from "@/interfaces"

import MessageUI from "../MessageUI/MessageUI"
import { useMemo } from "react"

type Props = {
  messages: Message[]
}

export default function MessagesUI({ messages }: Props) {

  const memoizedMessages = useMemo(() => {
    return messages.map(message => <MessageUI key={message.id} message={message} />)
  }, [messages])

  return (
    <div className="flex flex-col gap-4">
      {/* { messages.map( message => <MessageUI key={message.id} message={message}/>) } */}
      { memoizedMessages }
    </div>
  )
}