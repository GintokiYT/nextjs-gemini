type Props = {
  message: any
}

export default function MessageUI({ message }: Props) {
  return (
    <div className={`${message.emit === 'ia' ? '' : 'ml-auto'} max-w-80 mx-2 rounded-md text-white py-1`}>
      <div className='px-2 py-1'>
        <span className='font-bold'>{message.emit === 'me' ? 'Tu : ' : 'Geor : '}</span>
        <div className='message' dangerouslySetInnerHTML={{ __html: message.message }} />
      </div>
    </div>
  )
}